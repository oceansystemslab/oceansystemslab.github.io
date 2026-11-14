// All the content that changes often lives in this file.
// Edit the lists below to update people, news and publications. No build step is needed:
// save the file, commit, and the pages update.
//
// People: "image" is optional (initials are shown without it), as are "url", "project" and "detail".
// News: newest first. The home page shows the first four.
// Publications: give "doi" or "arxiv" (or a plain "url") to make the title a link.
//               Add  "selected": true  to show a paper on the home page.

const academics = [
  {"name": "Prof. Yvan Petillot", "role": "Professor of Robotics and Computer Vision", "image": "images/people/yvan.jpg", "url": "https://researchportal.hw.ac.uk/en/persons/yvan-petillot", "bio": "Full Professor of Robotics and Computer Vision at Heriot-Watt University. He is a leading member of the Ocean Systems Laboratory, the deputy director of the Institute for Sensor Signals and Systems and the deputy director of the joint research institute in Signal and Image Processing (ERP-SIP) with Edinburgh University. He is also currently a Royal Society Industry Fellow in collaboration with SeeByte Ltd, a company he co-founded in 2001 and in which he was Chief Technical Officer until 2010."},
  {"name": "Dr. Ignacio Carlucho", "role": "Assistant Professor in Robotics, Computer Vision and Autonomous Systems", "image": "images/people/ignacio.jpg", "url": "https://ignaciocarlucho.github.io/", "bio": "He is currently an Assistant Professor in Robotics, Computer Vision and Autonomous Systems at Heriot-Watt University. His research focuses on the development of intelligent robots that can perform complex tasks in real-world environments. Particularly, he is interested in robots that can cooperate with other agents. He obtained his PhD in 2019 from the National University of Central Buenos Aires, Argentina. He was previously a postdoctoral researcher at Louisiana State University, USA, from 2020 to 2021. He then held a position as a postdoctoral researcher at the University of Edinburgh, from 2021 to 2023."},
  {"name": "Dr. Maria Koskinopoulou", "role": "Assistant Professor in Robotics and Computer Vision", "image": "images/people/maria.jpg", "url": "https://researchportal.hw.ac.uk/en/persons/maria-koskinopoulou", "bio": "She is currently an Assistant Professor in Robotics and Computer Vision at the Institute of Signals, Sensors and Systems (ISSS), of the School of Engineering & Physical Sciences (EPS), of Heriot-Watt University, Edinburgh, UK. She holds a BSc in Electrical and Computer Engineering, MSc in Computational Neuroscience and PhD in Computer Science. Her interests and expertise are in the areas of Computer Vision and Machine (Deep) Learning, Robotic Manipulation and Smart Medical Devices. She was recently a Post-Doctoral Research Fellow at the Biomedical Robotics Laboratory of the Advanced Robotics Department of the Italian Institute of Technology (IIT), focusing on robotic manipulators and sensory systems applied to surgical scenarios."}
];

const postdocs = [
   {"name": "Simon Archieri", "role": "Researcher", "image": "images/people/simon.jpg", "project": "Underwater sonar 3D reconstruction."},
];

const phdStudents = [
  {"name": "Niamh Ellis", "role": "PhD candidate", "image": "images/people/niamh.jpg", "project": "Digital Twin for Safety: Underwater semi-autonomous inspection."},
  {"name": "Zebin Huang", "role": "PhD candidate", "image": "images/people/zebin.jpg", "url": "https://zebinhuang.com/", "project": "Assured Underwater Data Acquisition.", "detail": "Research interests: robotics, reinforcement learning, and human-machine interaction."},
  {"name": "Michele Grimaldi", "role": "PhD candidate", "image": "images/people/michele.jpg", "project": "Underwater inspection and planning for robust scene identification and advanced manipulation."},
  {"name": "Sümer Tunçay", "role": "PhD candidate", "image": "images/people/sumer.jpg", "project": "Towards collaborative inspections with multi-agent robotic systems via reinforcement learning."},
  {"name": "Favour Adetunji", "role": "PhD candidate", "image": "images/people/favour.jpg", "project": "Cable and pipe tracking for underwater autonomous vehicles."},
  {"name": "Shu Pan", "role": "PhD candidate", "image": "images/people/shu.jpg", "project": "Underwater camera and sonar, calibration and SLAM."},
  {"name": "Calum Arnott", "role": "PhD candidate", "image": "images/people/calum.jpeg", "project": "Underwater manipulation."},
];

const researchers = [
  {"name": "Simon Archieri", "role": "Researcher", "image": "images/people/simon.jpg", "project": "Underwater sonar 3D reconstruction."},

];

const alumni = [
  {"name": "Pierre Nicolay", "role": "PhD candidate", "image": "images/people/pierre.jpg", "url": "https://www.edinburgh-robotics.org/students/pierre-nicolay", "project": "Lifelong Learning for Vision based AUV Control.", "detail": "The main objective is to design a low-level controller for autonomous underwater vehicles (AUVs) using learning frameworks, portable across multiple robots and able to adapt quickly to any change in the dynamics."},
  {"name": "Dr. Markus Buchholz", "role": "Former postdoctoral researcher", "image": "images/people/markus.jpg", "url": "https://github.com/markusbuchholz", "detail": "Markus is a software and robotics professional with a Ph.D. in Mechatronics and over 20 years of experience. Currently, his research is centered on motion planning and manipulation in underwater robotics. His innovative approach has been recognized with two patents in robotics."},
  {"name": "Dr. Vibhav Bharti", "role": "Former postdoctoral researcher", "image": "images/people/vibhav.jpg", "url": "https://www.edinburgh-robotics.org/students/vibhav-bharti", "detail": "Statistical multi-sensor fusion for tracking subsea pipelines in and out of burial with autonomous underwater vehicles."}
];


const news = [
  {"date": "1 Jul 2026", "text": "Our new paper in collaboration with researchers from Universidad Nacional Autónoma de México was published at the Robotics and Autonomous Systems Journal.", "links": [{"label": "Paper", "url": "https://www.sciencedirect.com/science/article/abs/pii/S0921889026004938?via%3Dihub"}]},
  {"date": "1 Oct 2026", "text": "We organized AQUASIM v2 at IROS'26.", "links": [{"label": "Details", "url": "https://sites.google.com/view/aquasim-v2/home"}]},
  {"date": "1 Jul 2026", "text": "Our new paper on LLMs for multi-agent adaptive autonomy was publish at IEEE JOE.", "links": [{"label": "Paper", "url": "https://ieeexplore.ieee.org/abstract/document/11615016"}]},
  {"date": "10 Oct 2025", "text": "We presented MarineGym at IROS'25, a simulator environment for marine vehicles based on Isaac Sim.", "links": [{"label": "Paper", "url": "https://arxiv.org/abs/2410.14117"}]},
  {"date": "5 May 2025", "text": "Check our new developments in marine robot autonomy using LLMs.", "links": [{"label": "UROSA, a distributed robot autonomy", "url": "https://arxiv.org/abs/2507.23735"}, {"label": "Shared and multi-agent autonomy in underwater missions", "url": "https://arxiv.org/abs/2507.20370"}]},
  {"date": "5 May 2025", "text": "New paper out on RL for quadcopter control!", "links": [{"label": "Check it here", "url": "https://www.sciencedirect.com/science/article/pii/S0952197625020986"}]},
  {"date": "22 Oct 2023", "text": "Markus Buchholz joined the Ocean Systems Lab!"},
  {"date": "1 Oct 2023", "text": "We have started working on the UNITE project.", "links": [{"label": "Details", "url": "https://www.hw.ac.uk/news/articles/2023/crewless-maintenance-vessels-to-support.htm"}]},
  {"date": "15 Jul 2023", "text": "We held the DeepField summer school.", "links": [{"label": "Details", "url": "https://sites.google.com/view/deepfield23/home"}]}
];
const papers = [];