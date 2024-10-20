import React from 'react';
import '../components/Aboutus.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo1 from '../assets/isuru.jpg';
import logo2 from '../assets/hirushika.jpg';
import logo3 from '../assets/kasun.jpg';
import logo4 from '../assets/athur.png';
const AboutUs = () => {

  const people = [
    {
      name: 'Isuru Gunathilaka',
      title: 'BSc(Hons) Eng. Computer Systems Engineering',
      description: 'Expert in full-stack development and project management.',
      image: {logo1}
    },
    {
      name: 'Hirushika Nissanka',
      title: 'BSc(Hons) Eng. Computer Systems Engineering',
      description: 'Specialist in creating user-centered designs and experiences.',
      image: {logo2}
    },
    {
      name: 'Kasun Dhananjaya',
      title: 'BSc(Hons) Eng. Computer Systems Engineering',
      description: 'Focused on machine learning and data analysis.',
      image: {logo3}
    },
    {
      name: 'Isuru Wijesooriya',
      title: 'BSc(Hons) Eng. Computer Systems Engineering',
      description: 'Expert in full-stack development and project management.',
      image: {logo4}
    }
  ];

  return (
    <>
      <Header />
    <div className="about-container">
      {people.map((person, index) => (
        <div className="person-tile" key={index}>
          <img src={person.image} className="person-image" />
          <h3>{person.name}</h3>
          <h4>{person.title}</h4>
          <p>{person.description}</p>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
