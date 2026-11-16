import logo from "./image.png";

const Navbar = () => {

    const links = [
        { title: "Home", link: "/" },
        { title: "About Us", link: "/about" },
        { title: "All Books", link: "/allBooks" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];

    return (
        <div className="bg-black text-white py-4 px-8 flex justify-between items-center">

            <div className="flex items-center">
                <img
                    className="h-10 me-4"
                    src = {logo}
                    alt="logo"
                />

                <h1 className="text-2xl font-semibold">
                    ONLINE BOOK STORE
                </h1>
            </div>

            <div className="nav-links flex gap-4 items-center">
                <div className=" flex gap-4">
                    {links.map((link, index) => (
                        <div
                        className="hover:text-blue-500 transition-colors duration-300" key={index}>
                            {link.title}{" "}
                            </div>
                ))}
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-1 border border-blue-500 text-blue-500 rounded hover:bg-white hover:text-blue-500 transition-colors duration-300">
                        SignIn
                    </button>

                    <button className="px-4 py-1 bg-blue-500 text-white border border-blue-500 rounded hover:bg-white hover:text-blue-500 transition-colors duration-300">
                        SignUp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
