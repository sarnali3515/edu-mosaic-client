import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className="bg-[#8D6EC7]">
            <div className='max-w-screen-xl mx-auto '>
                <footer className="footer py-10  text-white">
                    <aside>
                        <Link to="/" className=" mb-3 md:mb-5"><img className="h-8 lg:h-14" src="https://i.ibb.co/zNF0bYr/edum-main.png" alt="" /></Link>
                        <p className="md:pl-5">Connecting learners and educators <br /> for a brighter future.</p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">LINKS</h6>
                        <Link to="/"> <a className="link link-hover">Home</a></Link>
                        <Link to="/courses"><a className="link link-hover">All Classes</a></Link>
                        <Link to="/teach-on"><a className="link link-hover">Teach On EduMosaic</a></Link>
                        <a className="link link-hover">About us</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Social</h6>
                        <div className="grid grid-flow-col gap-4">

                            <a href="https://www.youtube.com/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                            <a href="https://www.facebook.com/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                        </div>
                    </nav>
                </footer>
                <footer className="footer footer-center p-4  text-white">
                    <aside>
                        <p>Copyright © 2024 - All right reserved by EduMosaic - Sarnali</p>
                    </aside>
                </footer>
            </div>
        </div>
    );
};

export default Footer;