import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { currentSong } from "../features/musicSlice";

const MusicRecomendation = ({ music }) => {
  const dispatch = useDispatch();

  const handleGetMusic = async (titleSong) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(
        `http://localhost:5002/api/song/SpecSong?titleSong=${titleSong}`,
        config
      )
      .then((res) => {
        console.log(res);
        //res.data is an object
        dispatch(currentSong(res.data));
      });
  };

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(6, 1fr)",
      }}
      gap="10px"
      borderRadius="20px"
      bgColor="#06283D"
      width="100%"
    >
      {music.map((song) => (
        <Card
          key={song._id}
          width="200px"
          margin="10px"
          height={{ base: "400px", md: "300px" }}
          display="flex"
          justifyContent="center"
          onClick={() => handleGetMusic(song.titleSong)}
          backgroundColor="transparent"
        >
          <CardHeader>
            <Image
              src={song.Thumbnail}
              placeholder="Thumbnail"
              boxSize="200px"
              borderRadius='15px'
            />
          </CardHeader>
          <CardBody mt={-2}>
            <Text
              alignContent="center"
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              textColor="#DFF6FF"
            >
              {song.titleSong}
            </Text>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
};

export default MusicRecomendation;
