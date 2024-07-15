
import Face from '../../Assets/facebook-new-2023-icon9594.logowik.com.webp';
import insta from '../../Assets/modern-badge-logo-instagram-icon_578229-124.avif';
import x from '../../Assets/1691411078415.png';
import tik from '../../Assets/Tiktok_Logo.png';
import linkedin from '../../Assets/circle-linkedin-512.webp';
import telegram from '../../Assets/Telegram_logo.svg.webp';
import pinterest from '../../Assets/images.pinterest.png';
import Reddit from '../../Assets/images.reddit.jpeg';
import googlebusiness from '../../Assets/google_my_business_512dp.png';
import Youtube from '../../Assets/Youtube.jpg';
import './LinkAccount.css';
import axios from 'axios';



export default function LinkAccount({userData}) {
  console.log(userData);



 

  let token = localStorage.getItem("token");

  // Extract user email and profile key from localStorage
  const savedUserEmailData = localStorage.getItem('userEmailData');
  const user = JSON.parse(savedUserEmailData);

  console.log(user.email);

  const platforms = [
    { src: Face, alt: 'Facebook', name: 'Facebook' },
    { src: insta, alt: 'Instagram', name: 'Instagram' },
    { src: x, alt: 'X', name: 'X' },
    { src: tik, alt: 'Tiktok', name: 'Tiktok' },
    { src: pinterest, alt: 'Pinterest', name: 'Pinterest' },
    { src: telegram, alt: 'Telegram', name: 'Telegram' },
    { src: linkedin, alt: 'Linkedin', name: 'Linkedin' },
    { src: Reddit, alt: 'Reddit', name: 'Reddit' },
    { src: googlebusiness, alt: 'Google Business', name: 'Google Business' },
    { src: Youtube, alt: 'Youtube', name: 'Youtube' },
  ];

  async function linkAccounts() {
    const url = 'https://app.ayrshare.com/api/profiles/generateJWT';
    const data = {
      domain: "id-8sdfv",
      privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAwIXFODkBUC09mGBjgVjnmqNhTt1ZokH7FeHfuuxZlNLuDUdj
30rWSGn8HgF4QQDADS2sAjJNPnGfSVTESElow98BwLPsKHoATdockWv0Bk6GCTS4
sM+W9VNOvy14RUM9+WaFRbmHczXSuENxwoUMKZHD3NOUTC0rmwP+5V34tgL1P311
jkEjJv31ljAZG2a/dNxJHScGVZp5mfedpk/lVYrOIFnd/Jh3RCzXHtOePvcbEC1n
2uSSXbguPRqWd/a2uIpc0B8hUBSXgiXw/OGtO6PBIwF+9w4SzUvEQ3S195tKma4Y
anf99XI/qVTLIi0Of9aiWAPXgyWoqwUdtPz9xQIDAQABAoIBADxKSBJMy8v7dvQe
j1rE6DbFnmYPrI/DIOnf4+wKMx2HlrQC3NRi/8sKocEVzb5xiTM3T8waS5VYCL1y
tcs7bfsU/dwGnFiqqCi5OsQRrghBk/kTERmR0OD/10PIbgcmwSQ2xlqo+LGMM/Kv
cFMtzjrAYrlnauQWKzcu36adsJLyvBmO60VWpu0aWXttKoEgLv5gwtiqECpdhh3T
uWFB5SALVnBQaQ4k1XQR4+gdTPBpa5sXqbgeN1+qmRj4Bd/ilXjDchQSmFHPsFhW
evTs81kMOf7byGBrHohhWOAEfOWgwZKpfuYD9L45SCae7oIosCaZ7kzhalllRUTA
LZRNLJsCgYEA4+CVusG+MLKgmzfNk3JhGKrUqm6zkUgJ6hzQ0teLbUe9ZJ2gS2Bq
CY2ehqJ8Ijx5F78vGt/7WBudYZbhSzBEr5wW+NDXNtc5dMIdBitGzasNB/Zn+06o
2NLWida8q3ShKdFiPFJdkvf78CCGrX74WKUzak1FCQn42mMOw3zE6hMCgYEA2Eg1
nDK6A6owzYVJscgY8+l/S0pu7nVhGvNlaBlMqZMR3fFUUHzDEWESGOdZb5PF3coo
W4O1cz0Y0BW93uSGfAvBiGnSOs8SoOArNAh+7EmtC0x45KSdsdR9dSIHffvRh9CI
wskHetxB4tdrGw+EYyN88ffZ/Vt8kMlU+oK588cCgYAh+0K4x92By5FxtB+e5kae
dBMkmz+B4blAxS1K08PB9xnCIFNgCi+l3w2NzDswq83vAZ6XpmEH4Y5VmDdejAMi
IOe4EQSW8/9obu3/FoMHdoOJ9W/KJQ++zaoaggA+nTTPVJ8OmcXEfeB/DYqn4rBM
H86MApvR3j/S6USxWDDRKwKBgQCwHoUBT9FnoJQjF7G+AnpHTNGqhs80gQL1BlSC
Y2+o+qjm+Vi2PhI+ubQZ8XJDyKqsg60/cE42q/7jm4DE24SjyJLtOXbHCs5ZkJG9
yllIomo2NCyRy3baU3ViB7bgIUordWWYcEkWA/vm85I1M/qTHFfnVfP+OxyBbmEz
qXYxCwKBgQDLrcBxEwdDTBxVnK7RdAEPen3M49RZ76jkAIvMeyujG4X+dkR68VPH
duZvrg6zy/yZnu1SwirUpBwTGh5GZj9/aSeWavOzDu97OUrGMoD4V1F3xqMogTIn
EtnExOIJtmqwevUdZGmP7cGmIbhhcYy9I12NrsM2OVuF3mUIUbXgSQ==\n-----END RSA PRIVATE KEY-----`,
      profileKey: `${user.profileKey}`,
      email: {
        to: `${user.email}`
      },
      expiresIn: 10,
      redirect: "https://www.google.com/"
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer TH8S6RT-67ZMT2F-HTB3ZSH-PFEAPER`
    };

    const response = await axios.post(url, data, { headers });

    console.log(response.data);
    if (response.data.status === "success") {
      console.log(response);
      console.log(response.data);
      console.log(response.data.url);
      // console.log(token);
       window.location.href = response.data.url
      } 
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 font-weight-bold text-primary">Platforms</h2>
      <div className="text-center mb-4">
        <button className="btn btn-warning" onClick={linkAccounts}>Link Account</button>
      </div>
      <div className="row justify-content-center">
        {platforms.map((platform, index) => (
          <div key={index} className="col-6 col-md-4 mb-3">
            <div className="platform-card border-warning text-center">
              <img src={platform.src} alt={platform.alt} className="platform-icon" />
              <p>{platform.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
