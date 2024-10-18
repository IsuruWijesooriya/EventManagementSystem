import React from 'react';
import '../components/Aboutus.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
const AboutUs = () => {

  const people = [
    {
      name: 'Isuru Gunathilaka',
      title: 'BSc(Hons) Eng. Computer Systems Engineering',
      description: 'Expert in full-stack development and project management.',
      image: './src/assets/isuru.jpg'
    },
    {
      name: 'Hirushika Nissanka',
      title: 'BSc(Hons) Eng. Computer Systems Engineering',
      description: 'Specialist in creating user-centered designs and experiences.',
      image: './src/assets/hirushika.jpg'
    },
    {
      name: 'Kasun Dhananjaya',
      title: 'BSc(Hons) Eng. Computer Systems Engineering',
      description: 'Focused on machine learning and data analysis.',
      image: './src/assets/kasun.jpg'
    },
    {
      name: 'Isuru Wijesooriya',
      title: 'BSc(Hons) Eng. Computer Systems Engineering',
      description: 'Developing effective marketing strategies for the digital era.',
      image: './src/assets/athur.jpg'
    }
  ];

  return (
    <>
      <Header />
    <div className="about-container">
      {people.map((person, index) => (
        <div className="person-tile" key={index}>
          <img src={person.image} alt={person.name} className="person-image" />
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
