import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiPause } from "react-icons/hi";
import { FaRandom } from "react-icons/fa";
import { RxLoop } from "react-icons/rx";
import { MdGraphicEq } from "react-icons/md";
const MusicPlayer = () => {

  const currentTrack = useSelector((state) => state.music.CurrentTrack);
  const [sliderValue, setSliderValue] = useState(0);
  const audioRef = useRef();

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progressPercentage = (currentTime / duration) * 100;
    setSliderValue(progressPercentage);
  };

  const handleSliderChange = (value) => {
    const duration = audioRef.current.duration;
    const currentTime = (value / 100) * duration;
    audioRef.current.currentTime = currentTime;
    setSliderValue(value);
  };

  return (
    <Box width="inherit" display="flex" flexDirection="row">
      <Box id="button" display="flex" flexDirection="row" alignItems="center">
        <Button>
          <AiFillStepBackward />
        </Button>
        <Button>
          <HiPause />
        </Button>
        <Button>
          <AiFillStepForward />
        </Button>
        <Button>
          <FaRandom />
        </Button>
        <Button>
          <RxLoop />
        </Button>
      </Box>
      <Box id="audio">
        <audio
          src={currentTrack.secure_url}
          ref={audioRef}
          onTimeUpdate = {handleTimeUpdate}
          autoPlay
        ></audio>
      </Box>
      <Box id="slider" display="flex" justifyItems="center" width="100%">
        <Slider
          aria-label="slider-ex-4"
          defaultValue={0}
          value={sliderValue}
          onChange={handleSliderChange}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" as={MdGraphicEq} />
          </SliderThumb>
        </Slider>
      </Box>
      <Box id="inform" padding="10px" margin="10px">
        <Text>{currentTrack.public_id}</Text>
      </Box>
      <Box id="volumn"></Box>
    </Box>
  );
};

export default MusicPlayer;
