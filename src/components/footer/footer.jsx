import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import './footer.css'

const SocialLink = ({ icon, href, label }) => {
  return (
    <div className="social-link">
      <FontAwesomeIcon icon={icon} />
      <a href={href}>{label}</a>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <span>😊 Criado por Júlio Rauber, espero que goste! 😊</span>
        <div className="social-links">
          <SocialLink
            icon={faGithub}
            href={'https://github.com/juliorauber'}
            label={'GitHub'}
          />

          <SocialLink
            icon={faLinkedin}
            href={'https://www.linkedin.com/in/juliorauber/'}
            label={'Linkedin'}
          />
        </div>
      </div>
    </footer>
  )
}

export { Footer }
