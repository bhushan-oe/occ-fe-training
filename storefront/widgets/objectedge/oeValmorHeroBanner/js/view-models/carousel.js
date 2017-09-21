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
import Slide from './slide';

export class Carousel extends BaseWidget {

  @exportToViewModel
  config = ko.observable();

  @exportToViewModel
  slides = ko.observable();

  /**
   * On load view model
   */
  constructor() {
    //Constructing the BaseWidget
    super();
    this.config(this.getConfig());
    this.slides(this.getSlides());
  }

  beforeAppear() {
    if (this.config().autoPlay) {
      $('#myCarousel').carousel(this.config());
    }
  }

  validate(startDate, endDate) {
    return (
      startDate && moment(startDate,'MM/DD/YYYY','en',true).isValid() ? moment(startDate,'MM/DD/YYYY','en',true) <= moment()  : true
    ) && (
      endDate && moment(endDate,'MM/DD/YYYY','en',true).isValid() ? moment(endDate,'MM/DD/YYYY','en',true) >= moment() : true
    );
  }

  getSlides() {
    const slides = [];
    let imageUrl, mobileImageUrl, startDate, endDate, isvalid;
    for(let i = 1; i < 7; i++) {
      imageUrl = this.$data.hasOwnProperty(`imageUrl${i}`) && this.$data[`imageUrl${i}`]() !== undefined ? this.$data[`imageUrl${i}`]() : null;
      mobileImageUrl = this.$data.hasOwnProperty(`mobileImageUrl${i}`) && this.$data[`mobileImageUrl${i}`]() !== undefined ? this.$data[`mobileImageUrl${i}`]() : null;
      startDate = this.$data.hasOwnProperty(`startDate${i}`) && this.$data[`startDate${i}`]() !== undefined ? this.$data[`startDate${i}`]() : null;
      endDate = this.$data.hasOwnProperty(`endDate${i}`) && this.$data[`endDate${i}`]() !== undefined ? this.$data[`endDate${i}`]() : null;
      isvalid = this.validate(startDate, endDate);
      if (imageUrl && isvalid) {
        const slide = new Slide();
        slide.imageUrl = imageUrl;
        slide.mobileImageUrl = mobileImageUrl;
        slide.bannerLink = this.$data.hasOwnProperty(`bannerLink${i}`) && this.$data[`bannerLink${i}`]() !== undefined ? this.$data[`bannerLink${i}`]() : null;
        slide.bannerText = this.$data.hasOwnProperty(`bannerText${i}`) && this.$data[`bannerText${i}`]() !== undefined ? this.$data[`bannerText${i}`]() : null;
        slide.startDate = startDate;
        slide.endDate = endDate;
        slides.push(slide);
      }
    }
    return slides;
  }

  getConfig() {
    return {
      autoPlay: !!this.$data['boolAutoplayCarousel'](),
      wrap: !!this.$data['boolLoopCarousel'](),
      interval: this.$data.hasOwnProperty('timeSwitchImage') && this.$data['timeSwitchImage']() !== undefined && !isNaN(this.$data['timeSwitchImage']()) ? parseInt(parseInt(this.$data['timeSwitchImage'](),10) * 1000) : 4000,
    };
  }
}
