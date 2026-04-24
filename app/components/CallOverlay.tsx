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
}: any) {
  const localVideo = useRef<HTMLVideoElement | null>(null);
  const remoteVideo = useRef<HTMLVideoElement | null>(null);

  const [incoming, setIncoming] = useState(isIncoming);
  const [accepted, setAccepted] = useState(false);
  const [remoteOffer, setRemoteOffer] = useState<any>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const socket = useRef(
    io(process.env.NEXT_PUBLIC_BACKEND_WS_URL!, {
      transports: ["websocket"],
    })
  ).current;

  const ringtone =
    typeof Audio !== "undefined" ? new Audio("/ringtone.mp3") : null;

  useEffect(() => {
    if (incoming && ringtone) {
      console.log("🔔 RINGTONE START");
      ringtone.loop = true;
      ringtone.play().catch((err) => console.log("Ringtone blocked:", err));
    }
  }, [incoming]);

  const stopRingtone = () => {
    console.log("🔕 RINGTONE STOP");
    ringtone?.pause();
  };

  const setupConnection = async () => {
    if (pcRef.current) return;

    console.log("⚙️ SETUP CONNECTION");

    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pcRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("📤 SEND ICE CANDIDATE");
        socket.emit("ice-candidate", {
          candidate: e.candidate,
          conversationId: conversationId,
          from: user.id,
        });
      }
    };

    pcRef.current.ontrack = (e) => {
      console.log("🎥 REMOTE TRACK RECEIVED");
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = e.streams[0];
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      video: type === "video",
      audio: true,
    });

    console.log("📷 LOCAL STREAM READY");

    localStreamRef.current = stream;
    if (localVideo.current) localVideo.current.srcObject = stream;

    stream.getTracks().forEach((track) => {
      pcRef.current?.addTrack(track, stream);
    });
  };

  const startCall = async () => {
    console.log("📞 START CALL (caller)");

    await setupConnection();

    const offer = await pcRef.current!.createOffer();
    await pcRef.current!.setLocalDescription(offer);

    console.log("📤 SEND OFFER:", offer);

    socket.emit("call-offer", {
      offer,
      conversationId: conversationId,
      from: user.id,
      type,
    });
  };

  const acceptCall = async () => {
    console.log("👉 ACCEPT CLICKED");
    console.log("remoteOffer =", remoteOffer);

    if (!remoteOffer) {
      console.log("❌ remoteOffer is NULL — cannot accept");
      return;
    }

    stopRingtone();
    setAccepted(true);
    setIncoming(false);

    await setupConnection();

    console.log("📥 APPLY REMOTE OFFER");
    await pcRef.current!.setRemoteDescription(remoteOffer);

    const answer = await pcRef.current!.createAnswer();
    await pcRef.current!.setLocalDescription(answer);

    console.log("📤 SEND ANSWER:", answer);

    socket.emit("call-answer", {
      answer,
      conversationId: conversationId,
      from: user.id,
    });
  };

  const endCall = () => {
    console.log("🔚 END CALL");

    stopRingtone();
    socket.emit("call-end", { conversationId: conversationId });

    pcRef.current?.close();
    pcRef.current = null;

    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    onClose();
  };

  useEffect(() => {
    console.log("🔌 JOIN CALL ROOM:", conversationId);
    socket.emit("join-call-room", {
      conversationId: conversationId,
    });

    socket.on("call-offer", (data: any) => {
      console.log("📩 RECEIVED OFFER:", data);

      if (data.from === user.id) return;

      setRemoteOffer(data.offer);
      setIncoming(true);
    });

    socket.on("call-answer", async (data: any) => {
      console.log("📩 RECEIVED ANSWER:", data);

      if (data.from === user.id) return;

      stopRingtone();
      setAccepted(true);

      if (!pcRef.current) await setupConnection();

      console.log("📥 APPLY REMOTE ANSWER");
      await pcRef.current!.setRemoteDescription(data.answer);
    });

    socket.on("ice-candidate", async (data: any) => {
      if (data.from === user.id) return;

      console.log("📩 RECEIVED ICE CANDIDATE");

      try {
        await pcRef.current?.addIceCandidate(data.candidate);
      } catch (err) {
        console.log("❌ ICE ERROR:", err);
      }
    });

    socket.on("call-end", endCall);

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (!incoming) {
      console.log("📞 CALLER MODE → startCall()");
      startCall();
    }
  }, [incoming]);

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[99999] text-white">

      <div className="relative w-full max-w-xl h-[60vh] bg-black rounded-lg overflow-hidden">
        <video
          ref={remoteVideo}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        <video
          ref={localVideo}
          autoPlay
          muted
          playsInline
          className="absolute bottom-4 right-4 w-32 h-48 rounded-lg border border-white/20 object-cover"
        />
      </div>

      <p className="mt-4 text-lg">
        {incoming && !accepted && "Apel primit..."}
        {!incoming && !accepted && "Se apelează..."}
        {accepted && "Conectat"}
      </p>

      <div className="flex gap-6 mt-6">
        {!accepted && incoming && (
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
