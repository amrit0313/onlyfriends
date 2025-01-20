const Profile = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  return (
    <div className="flex items-center mt-1 h-[7rem] w-full object-cover absolute top-0">
      <div className="flex  items-center justify-center md:h-[7rem] md:w-[7rem] h-[5rem] w-[5rem] bg-white m-1 rounded-full border-2 border-slate-500">
        <img
          className="rounded-full md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] "
          src={`https://picsum.photos/seed/${randomNumber}/200/300`}
          alt="Random"
        />
      </div>
    </div>
  );
};

export default Profile;
