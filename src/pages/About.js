import aboutContent from '../content';

function About() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`已复制: ${text}`);
    });
  };

  return (
    <div className="about-container">
      <h1>{aboutContent.title}</h1>
      <div className="content-section">
        <div className="paragraphs">
          {aboutContent.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="profile-section">
          <img src="/profile.jpeg" alt="Profile" className="profile-image" />
          <div className="icons">
            <a href="https://twitter.com/jflam0529" target="_blank" rel="noopener noreferrer">
              <img src="/twitter.png" alt="Twitter" />
            </a>
            <img src="/wechat.png" alt="WeChat" onClick={() => handleCopy('JFLam0529')} />
            <img src="/gmail.png" alt="Gmail" onClick={() => handleCopy('jflam0529@gmail.com')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;