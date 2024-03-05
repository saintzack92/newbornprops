const myLinks = () => {
  return [
    {
      name: "Home",
      link: "/",
      submenu: false,

      class: `px-4 py-2 mx-2 cursor-pointer animation-hover   inline-block relative`,
    },
    {
      name: "About",
      link: "",
      submenu: true,
      class: "px-4 py-2 mx-3 cursor-pointer inline-block flex justify-end",
      sublinks: [
        {
          sublink: [
            {
              name: "Sejarah",
              link: "/",
            },
            { name: "Visi", link: "/" },
            { name: "Misi", link: "/login" },
          ],
        },
      ],
    },
  ];
};

export default myLinks;
