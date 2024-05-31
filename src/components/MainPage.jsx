import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/MainPage.css';
import Slider from './Slider.jsx';
import { slides } from '../slides';


const MainPage = () => {
  return (
    <div className='background'>
      <div className="px-4 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">Read with Joy</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Welcome to our website, where we are on a mission to 
          provide boundless access to knowledge and imagination. 
          As a sanctuary for avid readers, curious minds, 
          and knowledge seekers, our library stands as a haven for exploration, 
          learning, and discovery. Our library offers a convenient opportunity 
          to borrow books online. You can enjoy reading anytime and anywhere 
          by simply visiting our website. We have an extensive collection of 
          eBooks and audiobooks available to download or read directly in your browser. 
          Just register on our website, select the books you are interested 
          in and start immersing yourself in the world of literature!
          </p>
        </div>
      </div>
      <div>
       <Slider slides={slides} />
      </div>
    </div>
  );
}

export default MainPage