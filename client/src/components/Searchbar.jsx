const Searchbar = () => {
  return (
    <div className="relative">
      <span className=" absolute left-3 top-4  text-gray-600">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          className="h-16 w-16"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </span>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-secondary mb-12 h-24 w-4/5 rounded-lg pl-24 text-6xl text-accent"
      />
    </div>
  );
};

export default Searchbar;
