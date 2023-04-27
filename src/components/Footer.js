import React from "react";
import './styles/sitebodycollection.css';
import { VscGithubInverted, VscTwitter } from "react-icons/vsc";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
    return (
        <div>
            <footer className="footer d-flex align-items-center justify-content-center">
                <div className="container text-center">
                    <span>© 2023 All Rights Reserved.</span>
                    <br></br>
                    <a className="icon-git-footer" href="https://github.com/codeHysteria28" target="_blank"><VscGithubInverted/></a>
                    <a className="icon-git-footer" href="https://twitter.com/Chewbacca_w0w" target="_blank"><VscTwitter/></a>
                    <a className="icon-git-footer" href="https://www.linkedin.com/in/branislav-buna/" target="_blank"><BsLinkedin/></a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;