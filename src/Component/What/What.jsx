import React from 'react';
import '../What/What.css';

const socialMediaData = [
  {
    name: "Instagram",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    posts: [
      {
        type: "Post",
        details: [
          "Image: one image",
          "Max image size: 8 MB",
          "Supported formats: JPG, GIF, and PNG",
          "Video: one video",
          "Max video size: 1 GB",
          "Supported formats: MP4 and MOV",
          "Duration max: 15 minutes",
          "Duration min: 3 seconds"
        ]
      },
      {
        type: "Reels",
        details: [
          "Video: one video",
          "Max video size: 1 GB",
          "Supported formats: MP4 and MOV",
          "Duration max: 15 minutes",
          "Duration min: 3 seconds"
        ]
      },
      {
        type: "Stories",
        details: [
          "Images: one image",
          "Supported formats: JPEG",
          "Max image size: 8MB",
          "Video: one video",
          "Duration: 60 seconds maximum, 3 seconds minimum",
          "Max video size: 100MB"
        ]
      }
    ]
  },
  {
    name: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    posts: [
      {
        type: "Post",
        details: [
          "Text: up to 63,206 characters",
          "Image: multiple images",
          "Max image size: 10 MB each",
          "Supported formats: JPG, GIF, and PNG",
          "Video: multiple videos",
          "Max video size: 10 GB",
          "Supported formats: MP4 and MOV",
          "Duration max: 240 minutes",
          "Duration min: 1 second"
        ]
      }
    ]
  },
  {
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
    posts: [
      {
        type: "Tweet",
        details: [
          "Text: up to 280 characters",
          "Image: up to 4 images",
          "Max image size: 5 MB each",
          "Supported formats: JPG, GIF, and PNG",
          "Video: one video",
          "Max video size: 512 MB",
          "Supported formats: MP4 and MOV",
          "Duration max: 140 seconds",
          "Duration min: 1 second"
        ]
      }
    ]
  },
  {
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    posts: [
      {
        type: "Post",
        details: [
          "Text: up to 3,000 characters",
          "Image: multiple images",
          "Max image size: 5 MB each",
          "Supported formats: JPG, GIF, and PNG",
          "Video: one video",
          "Max video size: 5 GB",
          "Supported formats: MP4",
          "Duration max: 10 minutes",
          "Duration min: 3 seconds"
        ]
      }
    ]
  },
  {
    name: "Reddit",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/58/Reddit_logo_new.svg",
    posts: [
      {
        type: "Post",
        details: [
          "Text: no limit",
          "Image: multiple images",
          "Max image size: 20 MB each",
          "Supported formats: JPG, PNG",
          "Video: one video",
          "Max video size: 1 GB",
          "Supported formats: MP4, MOV",
          "Duration max: 15 minutes",
          "Duration min: 3 seconds"
        ]
      }
    ]
  },
  {
    name: "TikTok",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    posts: [
      {
        type: "Video",
        details: [
          "Max video size: 287.6 MB",
          "Supported formats: MP4, MOV",
          "Duration max: 60 seconds",
          "Duration min: 3 seconds"
        ]
      }
    ]
  },
  {
    name: "Telegram",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    posts: [
      {
        type: "Message",
        details: [
          "Text: no limit",
          "Image: one image",
          "Max image size: 5 MB",
          "Supported formats: JPG, PNG",
          "Video: one video",
          "Max video size: 2 GB",
          "Supported formats: MP4, MOV",
          "Duration max: no limit",
          "Duration min: no limit"
        ]
      }
    ]
  },
  {
    name: "Pinterest",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
    posts: [
      {
        type: "Pin",
        details: [
          "Image: one image",
          "Max image size: 10 MB",
          "Supported formats: JPG, PNG",
          "Video: one video",
          "Max video size: 2 GB",
          "Supported formats: MP4, MOV",
          "Duration max: 15 minutes",
          "Duration min: 4 seconds"
        ]
      }
    ]
  },
  {
    name: "YouTube",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    posts: [
      {
        type: "Video",
        details: [
          "Max video size: 128 GB",
          "Supported formats: MP4, MOV, AVI, FLV",
          "Duration max: 12 hours",
          "Duration min: 3 seconds"
        ]
      }
    ]
  },
  {
    name: "Google Business",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/70/Google_Business_Profile_Logo.svg",
    posts: [
      {
        type: "Post",
        details: [
          "Text: up to 1,500 characters",
          "Image: one image",
          "Max image size: 10 MB",
          "Supported formats: JPG, PNG",
          "Video: one video",
          "Max video size: 100 MB",
          "Supported formats: MP4, MOV",
          "Duration max: 30 seconds",
          "Duration min: 3 seconds"
        ]
      }
    ]
  }
];

export default function What() {
  return (
    <div className="container mt-5">
      {socialMediaData.map((platform, index) => (
        <div key={index} className="card shadow-sm p-3 mb-5 bg-white rounded">
          <div className="d-flex align-items-center mb-3">
            <img src={platform.logo} alt={`${platform.name} logo`} className="logo" />
            <h5 className="mb-0 ml-3">{platform.name}</h5>
          </div>
          {platform.posts.map((post, idx) => (
            <div key={idx}>
              <p><strong>{post.type} :-</strong></p>
              <ul>
                {post.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
