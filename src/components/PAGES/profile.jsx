const Profile = () => {
  const randomNumber = Math.floor(Math.random() * 100);

  const data = [
    {
      id: 1,
      username: "john_doe",
      post: "Exploring the new JavaScript features in ES2025!",
    },
    {
      id: 2,
      username: "jane_smith",
      post: "Loving the clean architecture pattern for my new project.",
    },
    {
      id: 3,
      username: "coding_wizard",
      post: "Did you know you can use async/await inside for loops?",
    },
    { id: 4, username: "dev_girl", post: "Just completed my first React app!" },
    {
      id: 5,
      username: "techie_tom",
      post: "Debugging is an art, not a science.",
    },
    {
      id: 6,
      username: "frontend_hero",
      post: "CSS Grid vs. Flexbox: which one do you use more often?",
    },
    {
      id: 7,
      username: "backend_master",
      post: "FastAPI has become my go-to framework for APIs.",
    },
    {
      id: 8,
      username: "database_guru",
      post: "Learned about indexing in SQL today, game changer!",
    },
    {
      id: 9,
      username: "py_dev",
      post: "Python decorators are so powerful and underrated.",
    },
    {
      id: 10,
      username: "javascript_ninja",
      post: "Event delegation is such a lifesaver in large DOM trees.",
    },
    {
      id: 11,
      username: "cloud_explorer",
      post: "Migrated my app to AWS and it's running smoothly.",
    },
    {
      id: 12,
      username: "ai_enthusiast",
      post: "ChatGPT has transformed how I approach coding problems.",
    },
    {
      id: 13,
      username: "ui_ux_pro",
      post: "Dark mode vs. light mode: what do you prefer?",
    },
    {
      id: 14,
      username: "game_dev",
      post: "Finally nailed the physics for my 2D platformer game!",
    },
    {
      id: 15,
      username: "security_hawk",
      post: "Cybersecurity is not just about tools; it's a mindset.",
    },
    {
      id: 16,
      username: "dev_ops_guy",
      post: "CI/CD pipelines are a lifesaver for large teams.",
    },
    {
      id: 17,
      username: "web_builder",
      post: "Building responsive websites is both an art and science.",
    },
    {
      id: 18,
      username: "mobile_creator",
      post: "Published my first Android app, feels amazing!",
    },
    {
      id: 19,
      username: "design_master",
      post: "Mastering Figma has made me so much faster at prototyping.",
    },
    {
      id: 20,
      username: "data_cruncher",
      post: "Just created a visualization dashboard with D3.js, looks awesome!",
    },
  ];

  return (
    <div className="flex flex-col gap-10  m-1  w-full h-full  bg-gradient-to-l from-indigo-200 overflow-scroll">
      <div className="flex  items-center justify-center md:h-[7rem] md:w-[7rem] h-[5rem] w-[5rem] bg-white m-2  border-2 rounded-full border-slate-500 ">
        <img
          className="rounded-full md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] m-2"
          src={`https://picsum.photos/seed/${randomNumber}/200/300`}
          alt="Random"
        />
      </div>
      <div className="flex flex-col items-center mb-20">
        {data.map((items) => (
          <div
            key={items.id}
            className="flex flex-col  mx-5  px-10 py-20 bg-neutral-500/50 text-white rounded-xl mb-10 relative w-4/5 z-[1]"
          >
            <p key={`f${items.id}`} className="font-extrabold">
              {items.post}
            </p>
            <p
              key={`a${items.id}`}
              className="absolute bottom-3 right-3 md:font-extrabold"
            >
              ~By
              <span className="text-slate-800 ">{` ${items.username}`}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
