import React, { useState, useEffect } from "react";
import { Container, VStack, Text, HStack, Box, Spinner, IconButton } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";

const mockFetchLiveScores = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, teamA: "Team Alpha", teamB: "Team Beta", scoreA: 2, scoreB: 3 },
        { id: 2, teamA: "Team Gamma", teamB: "Team Delta", scoreA: 1, scoreB: 1 },
      ]);
    }, 1000);
  });
};

const Index = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = async () => {
    setLoading(true);
    const liveScores = await mockFetchLiveScores();
    setScores(liveScores);
    setLoading(false);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <HStack width="100%" justifyContent="space-between">
          <Text fontSize="2xl">Live Sports Scores</Text>
          <IconButton aria-label="Refresh Scores" icon={<FaSync />} size="lg" onClick={fetchScores} />
        </HStack>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          scores.map((game) => (
            <Box key={game.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <HStack justifyContent="space-between">
                <Text>{game.teamA}</Text>
                <Text>{game.scoreA}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text>{game.teamB}</Text>
                <Text>{game.scoreB}</Text>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
