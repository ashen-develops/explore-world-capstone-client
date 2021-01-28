import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa'


class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
                <footer>
                    <div>
                        <h1>Contact the Dev</h1>
                        <ul>
                            <li class="contact-info">
                                <a rel="noreferrer" href="mailto:ashenp.designs@gmail.com?subject=Hello" target="_blank" aria-label="Email Ashen">
                                    <i aria-hidden class="fas fa-envelope" title="Email"></i>
                                </a>
                            </li>
                            <li class="contact-info">
                                <a rel="noreferrer" href="https://github.com/ashen-develops" target="_blank" aria-label="View GitHub profile">
                                    <i aria-hidden class="fab fa-github" title="GitHub"></i>
                                </a>
                            </li>
                            <li class="contact-info">
                                <a rel="noreferrer" href="https://angel.co/ellie-grebowski?public_profile=1" target="_blank" aria-label="View AngelList profile">
                                    <i aria-hidden class="fab fa-angellist" title="AngelList"></i>
                                </a>
                            </li>
                            <li class="contact-info">
                                <FaEnvelope rel="noreferrer" href="https://www.linkedin.com/in/ellie-grebowski" target="_blank" aria-label="View LinkedIn profile" />
                                    <i aria-hidden class="fab fa-linkedin" title="LinkedIn"></i>
                            </li>
                        </ul>
                    </div>
                    <div className="under">
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;