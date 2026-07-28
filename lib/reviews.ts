export type Review = {
  name: string;
  subtitle: string;
  initial: string;
  avatarColor: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Window Adv",
    subtitle: "Local Guide · 1 review",
    initial: "W",
    avatarColor: "#0d9488",
    avatar: "/review-icons/window-adv.png",
    rating: 5,
    date: "5 days ago",
    text: "We are very satisfied with the services provided by VELIQ. The team demonstrated excellent expertise in SEO and paid ads while maintaining outstanding communication throughout the project. They were organized, professional, and focused on achieving the best possible results. I would gladly recommend them to anyone looking to grow their business online.",
  },
  {
    name: "Promo tru",
    subtitle: "1 review",
    initial: "P",
    avatarColor: "#2563eb",
    avatar: "/review-icons/promo-tru.png",
    rating: 5,
    date: "5 days ago",
    text: "Working with VELIQ has been an excellent experience. Their SEO strategy and paid advertising campaigns were well planned and professionally executed. What impressed me the most was their clear communication, attention to detail, and commitment to delivering quality work. Definitely a team you can trust.",
  },
  {
    name: "Ahmed Hamdi",
    subtitle: "4 reviews",
    initial: "A",
    avatarColor: "#ea580c",
    avatar: "/review-icons/ahmed-hamdi.png",
    rating: 5,
    date: "5 days ago",
    text: "I had a great experience working with VELIQ. Their team is highly professional, responsive, and knowledgeable in both SEO and paid advertising. Communication was smooth throughout the project, and they were always available to answer questions and provide updates. I highly recommend them to anyone looking for reliable digital marketing services.",
  },
  {
    name: "Coach Batool",
    subtitle: "1 review",
    initial: "ك",
    avatarColor: "#db2777",
    avatar: "/review-icons/coach-batool.png",
    rating: 5,
    date: "a day ago",
    text: "Of course, my opinion is biased when it comes to VELIQ. They helped me create my first website, and their service was fantastic — quick to respond, solve problems, and frequently check on the site's status to see if any modifications were needed. Thank you from the bottom of my heart, and best of luck always! 💗🌸",
  },
  {
    name: "Mohammed Ismail",
    subtitle: "1 review",
    initial: "M",
    avatarColor: "#7c3aed",
    rating: 5,
    date: "6 days ago",
    text: "Excellent.",
  },
  {
    name: "Ahmed Maged Diab",
    subtitle: "Local Guide · 23 reviews",
    initial: "A",
    avatarColor: "#16a34a",
    avatar: "/review-icons/ahmed-maged-diab.png",
    rating: 5,
    date: "6 days ago",
    text: "Dealing with them is very nice and they are very skilled. ❤️",
  },
  {
    name: "White and Black Desert",
    subtitle: "",
    initial: "W",
    avatarColor: "#b45309",
    avatar: "/review-icons/white-and-black-desert.png",
    rating: 5,
    date: "5 hours ago",
    text: "Working with VELiQ has been a fantastic experience! They developed a highly professional website for my business and did an outstanding job on SEO. The team is extremely respectful, professional, and easy to communicate with. Highly recommended for anyone looking for top-quality digital solutions and polite service!",
  },
  {
    name: "G G",
    subtitle: "1 review",
    initial: "G",
    avatarColor: "#7c3aed",
    rating: 5,
    date: "5 hours ago",
    text: "I worked with Mr. Fadi on programming, website management, and domain projects, and it was truly an excellent experience. He's a professional, understands his work well, is punctual, and is always ready to solve any technical problem quickly and honestly. I highly recommend him to anyone needing professional programming and website management services.",
  },
];

// Homepage shows a curated 6; Mohammed Ismail is swapped for White and Black
// Desert there but still appears normally on the full /reviews page.
export const HOMEPAGE_REVIEWS: Review[] = REVIEWS.filter((r) => r.name !== "Mohammed Ismail" && r.name !== "G G");
