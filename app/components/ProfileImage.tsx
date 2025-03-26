'use client';

export default function ProfileImage() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden">
      <img
        src="/images/headshot.jpg"
        alt="Luke's professional headshot"
        className="w-full h-full object-cover"
      />
    </div>
  );
} 