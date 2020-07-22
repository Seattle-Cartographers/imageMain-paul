import React from 'react';
import axios from 'axios';
import './style.css';
import './styleModal.css';
import Chance from 'chance';
import {FiHeart, FiExternalLink } from 'react-icons/fi';
import BottomDescription from './BottomDescription';
import MidBar from './MidBar';
import Carousel from './Carousel';

const chance = new Chance();
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHearted: false,
      rating: 0,
      review: [''],
      title: '',
      images: [{}],
    }; // eslint-disable-line

  }

  componentDidMount() {
    // const locId = new URL(window.location.href);
    // const newLoc= locId.pathname
    // // console.log(secondLevelLocation)
    // console.log(newLoc)

    const { testOne } = this.props;
    // need to get the last 3 charecters from this parsed url
    axios.get(`/${testOne}/api/carousels`)
      .then((locationData) => {
        this.setState({
          rating: locationData.data.rating,
          review: locationData.data.review,
          title: locationData.data.title,
          images: locationData.data.images,
        });
      })
      .catch((err) => {
        console.error(err); // eslint-disable-line
      });
  }

  render() { // eslint-disable-line

    const {
      isHearted,
      rating, review,
      title,
      images,
    } = this.state;
    // this variable makes full circles to displaty
    const fullRating = [...Array(rating)].map((item, i) => ((<span className="circle" key={i.toString()}> </span>)));
    // this variable makes the empty circles
    const emptyRating = [...Array(5 - rating)].map((item, i) => ((<span className="empty-circle" key={i.toString()}> </span>)));
    // this line of code makes a random 3 or 4 digit number and adds commas
    const revNumber = chance.integer({ min: 900, max: 2100 }).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
      <div className="description">
        <div className="container">
          <div className="top-container">
            <div className="top-wrapper">
              <div className="header">
                <h1>{title}</h1>
                <div className="right-header">
                  {isHearted ?  <FiHeart/> : <FiHeart/>}
                </div>
                <div className="right-icon">
                  <FiExternalLink/>
                </div>

                <div className="rating">
                  {fullRating}
                  {emptyRating}
                  <span className="review-number">
                    {revNumber}
                    Reviews
                  </span>
                </div>
                <div>
                  <span id="misc-rev">
                    <p id="mbold">
                      #
                      {chance.integer({ min: 1, max: 5 })}
                    </p>
                  </span>
                  <span id="misc-revt">
                    <p>
                      of
                      {chance.integer({ min: 5, max: 25 })}
                      things to do at this destination
                    </p>
                  </span>
                </div>

              </div>

            </div>

          </div>
          <div className="bottom-description-wraper">
            <BottomDescription quotes={review} />
          </div>
          <MidBar />
        </div>
        <div className="carousel-section">
          <Carousel imgData={images} />
        </div>
      </div>

    );
  }
}

export default Description;
