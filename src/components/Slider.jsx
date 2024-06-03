import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import '../Styles/Slides.css';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid'; 


function Slider({slides}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    console.log('selected index', selectedIndex);
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {slides.map((slide) => {
        const { image, title, subtitle, interval, svg } = slide;
        return (
          <Carousel.Item key={uuidv4()} interval={interval}>
            <img 
              src={image}
              className='slides'
              alt={title}
            />
            <Carousel.Caption className="items">
              <h3 className='title'>{title}</h3>
              <p>{subtitle}</p>
              <img src={svg} className='svg' alt={`${title} icon`} />
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

Slider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      interval: PropTypes.number.isRequired,
      svg: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Slider;
