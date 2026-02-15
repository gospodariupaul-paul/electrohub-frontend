{/* TOP NAVIGATION BAR */}
<div className="w-full px-4 py-3 border-b border-gray-300 bg-white flex items-center justify-between gap-4 sticky top-0 z-50">

  {/* SEARCH BAR */}
  <div className="flex-1">
    <input
      type="text"
      placeholder="Caută..."
      className="w-full p-2 rounded-full bg-gray-100 border border-gray-300 text-sm px-4"
    />
  </div>

  {/* ICONIȚE NAVIGARE */}
  <div className="flex items-center gap-4 text-gray-700">

    {/* HOME */}
    <Link href="/" className="hover:text-black transition">
      <i className="fa-solid fa-house text-xl"></i>
    </Link>

    {/* MESAJE */}
    <Link href="/messages" className="hover:text-black transition">
      <i className="fa-solid fa-message text-xl"></i>
    </Link>

    {/* NOTIFICĂRI */}
    <Link href="/notifications" className="hover:text-black transition relative">
      <i className="fa-solid fa-bell text-xl"></i>
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-full">3</span>
    </Link>

    {/* GRUPURI */}
    <Link href="/groups" className="hover:text-black transition">
      <i className="fa-solid fa-users text-xl"></i>
    </Link>

    {/* REELURI */}
    <Link href="/reels" className="hover:text-black transition">
      <i className="fa-solid fa-clapperboard text-xl"></i>
    </Link>

    {/* PROFIL / AUTENTIFICARE */}
    <Link href="/login" className="hover:text-black transition">
      <i className="fa-solid fa-user text-xl"></i>
    </Link>

  </div>
</div>
