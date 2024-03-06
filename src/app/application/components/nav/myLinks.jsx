const myLinks = () => {
  return [
    {
      label: "Features",
      link: "#",
      children: [
        {
          label: "Todo list",
          link: "#",
        },
        {
          label: "Calendar",
          link: "#",
        },
        {
          label: "Reminders",
          link: "#",
        },
        {
          label: "Planning",
          link: "#",
        },
      ],
    },
    {
      label: "Compnay",
      link: "#",
      children: [
        {
          label: "History",
          link: "#",
        },
        {
          label: "Our Team",
          link: "#",
        },
        {
          label: "Blog",
          link: "/login",
        },
      ],
    },
    {
      label: "Careers",
      link: "/login",
    },
    {
      label: "About",
      link: "#",
    },
  ];
};

export default myLinks;
