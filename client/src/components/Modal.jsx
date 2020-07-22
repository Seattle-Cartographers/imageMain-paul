import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ModalSlide from './ModalSlide';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import MiniSlider from './MiniSlider';
import {AiOutlineClose, AiOutlineLike} from 'react-icons/ai';
import {RiWindowsLine} from 'react-icons/ri';
import {FaRegFlag} from 'react-icons/fa';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'fullscreen',
      newindex: this.props.current,
      galOption:this.props.GalBool,

    };
    this.updateHelpful = this.updateHelpful.bind(this);
    this.updateReported = this.updateReported.bind(this);
    this.MiniSlide = this.MiniSlide.bind(this);
    this.SlideOnClick = this.SlideOnClick.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerGallery = this.clickHandlerGallery.bind(this);
    this.prevImg = this.prevImg.bind(this);
    this.nextImg = this.nextImg.bind(this);
  }
  // componentDidMount(){
  //   this.setState({ index:this.props.current })
  // }

  updateHelpful(e) {
    const { imginfo } = this.props;
    const { newindex } = this.state;
    const idTag = imginfo[newindex].imgId;
    e.preventDefault();
    axios.patch(`${idTag}/api/carousels/helpful`)
      .then(() => {
        console.log(`this imgID:${idTag} helpful state has been updated `);
      })
      .catch((err) => {
        console.error(err); // eslint-disable-line
      });

  }

  updateReported(e) {
    const { imginfo } = this.props;
    const { newindex } = this.state;
    const idTag = imginfo[newindex].imgId;
    e.preventDefault();
    axios.patch(`${idTag}/api/carousels/helpful`)
      .then(() => {
        console.log(`this imgID:${idTag} helpful state has been updated `);
      })
      .catch((err) => {
        console.error(err); // eslint-disable-line
      });

  }

  clickHandler(e) {
    e.preventDefault();
    this.setState({ view: 'fullscreen' });
  }

  clickHandlerGallery(e) {
    e.preventDefault();
    this.setState({ view: 'gallery' });
  }

  nextImg(event) {
    event.preventDefault();
    const { newindex } = this.state;

    let index = newindex;
    const { imginfo } = this.props;
    if (index === imginfo.length - 1) {
      index = -1;
    }
    index += 1;
    this.setState({ newindex: index }); // eslint-disable-line

  }

  prevImg(event) {
    event.preventDefault();

    let { newindex } = this.state;
    // the arraylength has to be different so you dont skip an image
    const { imginfo } = this.props;

    // this should set i to the end of the array
    if (newindex < 1) {
      newindex = imginfo.length;
    }
    newindex -= 1;
    this.setState({
      newindex,
    });
  }

  SlideOnClick(index) {

    this.setState({
      newindex: index,
    });
    this.clickHandler(event);
  }

  MiniSlide(index) {

    this.setState({
      newindex: index,
    });

  }

  render() {

    const testOne = [];
    const { imginfo, close, GalBool } = this.props;
    const { newindex, view } = this.state;
    imginfo.forEach((item) => testOne.push(item));
    const galleryitem = testOne.map((item, index) => (
      <div className="gallery-box" key={`${index}` + 10}>
        <img className="gallery-box-sizing" src={testOne[index].url} alt="mini-pic-gallery" onClick={() => { return this.SlideOnClick(index); }} />
      </div>
    ));
    const slideItem = testOne.map((item, index) => (
      <MiniSlider key={`${index}47`} mLink={testOne[index].url} setIndex={this.MiniSlide} i={index} />
    ));

    const userData = imginfo[newindex];

    const fullRating = [...Array(userData.userrating)].map((item, i) => ((<span className="profile-circle" key={i.toString()}> </span>)));
    // this variable makes the empty circles
    const emptyRating = [...Array(5 - userData.userrating)].map((item, i) => ((<span className="profile-empty-circle" key={i.toString()}> </span>)));

    if (GalBool === true || view === 'gallery') {
      return (
        <div className="modal-Container-gallery">
          <div className="outside-close">
            <button className="modal-close-button" onClick={close} type="button">
              <AiOutlineClose />
            </button>

          </div>
        <div className="inside-offset">
              <div className="scroll-content">
                <div className="height-limiter">
                  {galleryitem}
                </div>
              </div>
              <div className="side-bar">

              </div>
            </div>

        </div>
        );
      } else {

          return(
          <div className="modal-Container-fullscreen">
            <div className="outside-close">
              <button className="modal-close-button" onClick={close} type="button">
                <AiOutlineClose />
              </button>
            </div>
          <div className="inside-offset">
            <div className="fullscreen-content">
              <div className="full-content-styling">
                <ModalSlide urlString={imginfo[newindex].url} />
                <div className="gallery-overlay">
                  <button className="gallery-button" onClick={this.clickHandlerGallery} type="button">
                    <RiWindowsLine />
                    Gallery
                  </button>
                </div>
                <div className="helpful-overlay">
                    <button className="helpful-button" onClick={this.updateHelpful} type="button">
                      <AiOutlineLike />
                        Helpful
                    </button>
                  </div>

                  <div className="reported-overlay">
                    <button className="reported-button" onClick={this.updateReported} type="button">
                      <FaRegFlag />
                      Reported
                    </button>
                  </div>
                <div className="modal-left-arrow-overlay">
                  <LeftArrow leftFunc={this.prevImg} />
                </div>
                <div className="modal-right-arrow-overlay">
                  <RightArrow rightFunc={this.nextImg} />
                </div>
                <div className="mini-slider-container">
                  {slideItem}

                </div>
              </div>
              {newindex >= 0 ? <div className="side-bar">
                <div className="user-profile-container">
                  <div className="user-profile-offset">
                  <div className="left-profile-section">
                  <img className="profile-pic" src={userData.profile} alt="user profile" />
                </div>
              <div className="user-description">
                <div className="user-rating">
                {fullRating}
                {emptyRating}
                </div>
                <div className="user-title">
                  {`${userData.titleTwo}`}
                </div>
                <div className="user-misc-info">
                  {`${userData.description}`}
                </div>
              </div>
                  </div>
              </div>
            </div> :<div> </div>}

            </div>

            </div>

          </div>
          );
        }
      }
    }

export default Modal;
