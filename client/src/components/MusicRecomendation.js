import { Box, Card, CardBody, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { currentSong } from "../features/musicSlice";


const MusicRecomendation = ({ music }) => {
  
  const dispatch = useDispatch();


  const handleGetMusic = async (public_id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(
        `http://localhost:5002/api/song/SpecSong?public_id=${public_id}`,
        config
      )
      .then((res) => {
        dispatch(currentSong(res.data))
      });
  };

  return (
    <Box width="100%" borderRadius="20px" bgColor="#06283D">
      <Box>
        <Text color="#DFF6FF" fontSize={16} margin="20px 20px 20px 20px">
          Music for you
        </Text>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          flexWrap="nowrap"
          alignContent="center"
          justifyContent="center"
        >
          {music.map((song) => (
            <Card
              key={song.asset_id}
              width="200px"
              margin="10px"
              height={{ base: "200px", md: "180px" }}
              display="flex"
              justifyContent="center"
              onClick={() => handleGetMusic(song.public_id)}
            >
              <CardBody>
                <HStack spacing="20px">
                  <Text alignContent="center">{song.public_id}</Text>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MusicRecomendation;
