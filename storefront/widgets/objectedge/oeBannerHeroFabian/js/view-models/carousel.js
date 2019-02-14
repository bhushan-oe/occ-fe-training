/**
 * Core
 */
import { exportToViewModel } from 'occ-components/widget-core/decorators';
import { BaseWidget } from 'occ-components/widget-core';
 
/**
 * Libraries, Helpers
 */
import $ from 'jquery';
import ko from 'knockout';
import moment from 'moment';
 
/**
 * Models
 */
import Slide from './slide'

export class Carousel extends BaseWidget {
  @exportToViewModel
  config = ko.observable();

  @exportToViewModel
  slides = ko.observable();
  
  /**
   * On load view model
   */
  constructor(){
    super();
    this.config(this.getConfig());
    this.slides(this.getSlide());
  }
  
  beforeAppear() {
    if (this.config().autoPlay) {
      $('#myCarousel').carousel(this.config());
    }
  }
  
  getSlide() {
    let slides = [];
    let imageUrl, mobileImageUrl, startDate, endDate, isvalid;
    
    for(let i = 1; i < 7; i++) {
      imageUrl = this.$data.hasOwnProperty(`imageUrl${i}`) 
                && this.$data[`imageUrl${i}`]() !== "" ? this.$data[`imageUrl${i}`]() : null;
      mobileImageUrl = this.$data.hasOwnProperty(`mobileImageUrl${i}`) 
                && this.$data[`mobileImageUrl${i}`]() !== "" ? this.$data[`mobileImageUrl${i}`]() : null;
      startDate = this.$data.hasOwnProperty(`startDate${i}`) 
                && this.$data[`startDate${i}`]() !== "" ? this.$data[`startDate${i}`]() : null;
      endDate = this.$data.hasOwnProperty(`endDate${i}`) 
                && this.$data[`endDate${i}`]() !== "" ? this.$data[`endDate${i}`]() : null;
      isvalid = this.validate(startDate, endDate) && imageUrl !== null ? true : false;
      
      if (isvalid) {
        let slide = this.getNewSlide(i, imageUrl, mobileImageUrl, startDate, endDate);
        
        slides.push(slide);
      }
    }
    
    return slides;
  }
  
  validate(startDate, endDate) {
    return (
      moment(startDate,'MM/DD/YYYY','en',true) <= moment() ? true : false
    ) && (
      moment(endDate,'MM/DD/YYYY','en',true) >= moment() ? true : false
    );
  }
  
  getConfig() {
    return {
      autoPlay: !!this.$data['boolAutoplayCarousel'](),
      wrap: !!this.$data['boolLoopCarousel'](),
      interval: this.$data.hasOwnProperty('timeSwitchImage') 
              && this.$data['timeSwitchImage']() !== undefined
              && isNaN(this.$data['timeSwitchImage']()) ? parseInt(parseInt(this.$data['timeSwitchImage'](), 10) * 1000) : 4000
    }
  }
  
  getConfig() {
    return {
      autoPlay: !!this.$data['boolAutoplayCarousel'](),
      wrap: !!this.$data['boolLoopCarousel'](),
      interval: this.$data.hasOwnProperty('timeSwitchImage') && this.$data['timeSwitchImage']() !== undefined && !isNaN(this.$data['timeSwitchImage']()) ? parseInt(parseInt(this.$data['timeSwitchImage'](),10) * 1000) : 4000,
    };
  }
  
  getNewSlide(num, imageUrl, mobileImageUrl, startDate, endDate) {
    const slide = new Slide();
        slide.imageUrl = imageUrl;
        slide.mobileImageUrl = mobileImageUrl;
        slide.bannerLink = this.$data.hasOwnProperty(`bannerLink${num}`) && this.$data[`bannerLink${num}`]() !== undefined ? this.$data[`bannerLink${num}`]() : null;
        slide.bannerText = this.$data.hasOwnProperty(`bannerText${num}`) && this.$data[`bannerText${num}`]() !== undefined ? this.$data[`bannerText${num}`]() : null;
        slide.startDate = startDate;
        slide.endDate = endDate;
        return slide;
  }
}