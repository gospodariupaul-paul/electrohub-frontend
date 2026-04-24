"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function CallOverlay({
  type,
  conversationId,
  user,
  otherUser,
  onClose,
  isIncoming = false,
  incomingData = null,
}: any) {
  const localVideo = useRef<HTMLVideoElement | null>(null);
  const remoteVideo = useRef<HTMLVideoElement | null>(null);

  const [accepted, setAccepted] = useState(false);
  const [remoteOffer, setRemoteOffer] = useState<any>(incomingData?.offer || null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const socket = useRef(
    io(process.env.NEXT_PUBLIC_BACKEND_WS_URL!, {
      transports: ["websocket"],
    })
  ).current;

  // CAMERA MICĂ DRAGGABLE
  const [localPos, setLocalPos] = useState({ x: 20, y: 20 });
  const draggingRef = useRef(false);

  const startDrag = () => {
    draggingRef.current = true;
  };

  const stopDrag = () => {
    draggingRef.current = false;
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setLocalPos({
      x: e.clientX - 80,
      y: e.clientY - 80,
    });
  };

  const stopAllRingtones = () => {
    const w = window as any;
    if (w.__callerRingtone) {
      w.__callerRingtone.pause();
      w.__callerRingtone = null;
    }
    if (w.__receiverRingtone) {
      w.__receiverRingtone.pause();
      w.__receiverRingtone = null;
    }
  };

  const setupConnection = async () => {
    if (pcRef.current) return;

    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          candidate: e.candidate,
          conversationId,
          from: user.id,
        });
      }
    };

    pcRef.current.ontrack = (e) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = e.streams[0];
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: type === "video",
      audio: true,
    });

    localStreamRef.current = stream;
    if (localVideo.current) localVideo.current.srcObject = stream;

    stream.getTracks().forEach((track) => {
      pcRef.current?.addTrack(track, stream);
    });
  };

  const startCall = async () => {
    await setupConnection();

    const offer = await pcRef.current!.createOffer();
    await pcRef.current!.setLocalDescription(offer);

    socket.emit("call-offer", {
      offer,
      conversationId,
      from: user.id,
      type,
    });
  };

  const acceptCall = async () => {
    stopAllRingtones();

    if (!remoteOffer) return;

    await setupConnection();

    await pcRef.current!.setRemoteDescription(remoteOffer);

    const answer = await pcRef.current!.createAnswer();
    await pcRef.current!.setLocalDescription(answer);

    socket.emit("call-answer", {
      answer,
      conversationId,
      from: user.id,
    });

    setAccepted(true);
  };

  const endCall = () => {
    stopAllRingtones();
    socket.emit("call-end", { conversationId });

    pcRef.current?.close();
    pcRef.current = null;

    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    onClose();
  };

  useEffect(() => {
    socket.emit("join-call-room", { conversationId });

    socket.on("call-answer", async (data: any) => {
      if (data.from === user.id) return;

      stopAllRingtones();

      if (!pcRef.current) await setupConnection();

      await pcRef.current!.setRemoteDescription(data.answer);
      setAccepted(true);
    });

    socket.on("ice-candidate", async (data: any) => {
      if (data.from === user.id) return;

      try {
        await pcRef.current?.addIceCandidate(data.candidate);
      } catch {}
    });

    socket.on("call-end", endCall);

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (!isIncoming) {
      startCall();
    }
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[99999] text-white"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div className="relative w-full max-w-xl h-[60vh] bg-black rounded-lg overflow-hidden">
        <video
          ref={remoteVideo}
          autoPlay
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-cover"
        />

        <video
          ref={localVideo}
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          onMouseDown={startDrag}
          className="w-32 h-48 rounded-lg border border-white/20 object-cover cursor-grab"
          style={{
            position: "absolute",
            top: localPos.y,
            left: localPos.x,
            zIndex: 999999,
          }}
        />
      </div>

      <p className="mt-4 text-lg">
        {isIncoming && !accepted && "Apel primit..."}
        {!isIncoming && !accepted && "Se apelează..."}
        {accepted && "Conectat"}
      </p>

      <div className="flex gap-6 mt-6">
        {isIncoming && !accepted && (
          <button
            onClick={acceptCall}
            className="px-6 py-3 bg-green-600 rounded-full text-lg"
          >
            Acceptă
          </button>
        )}

        <button
          onClick={endCall}
          className="px-6 py-3 bg-red-600 rounded-full text-lg"
        >
          Închide
        </button>
      </div>
    </div>
  );
}
