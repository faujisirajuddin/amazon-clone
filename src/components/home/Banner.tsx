import { Carousel } from 'react-responsive-carousel';
import sliderImg_1 from "../../images/slider/sliderImg_1.jpg"
import sliderImg_2 from "../../images/slider/sliderImg_2.jpg"
import sliderImg_3 from "../../images/slider/sliderImg_3.jpg"
import sliderImg_4 from "../../images/slider/sliderImg_4.jpg"
import Image from 'next/image';
const Banner = () => {

    return (
        <div className='relative'>
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={3000}
            >
                <div>
                    <Image priority src={sliderImg_1} alt="Img1" />
                </div>
                <div>
                    <Image src={sliderImg_2} alt="Img2" />
                </div>
                <div>
                    <Image src={sliderImg_3} alt="Img3" />
                </div>
                <div>
                    <Image src={sliderImg_4} alt="Img4" />
                </div>
            </Carousel>
            <div className='absolute w-full h-40 bg-gradient-to-t from-gray-50 to-transparent bottom-0 z-20'>
            </div>
        </div>
    )
}

export default Banner