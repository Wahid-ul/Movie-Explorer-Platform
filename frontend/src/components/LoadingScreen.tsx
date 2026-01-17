import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
    >
      {/* Top moving part (Action flap) */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
      >
        <Typography fontSize={40}>🎬</Typography>
      </motion.div>

      {/* Bottom fixed part */}
      <Typography fontSize={40} sx={{ mt: -1 }}>
        ━━━
      </Typography>

      {/* Animated Text */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        <Typography
          sx={{
            color: "#fff",
            mt: 2,
            letterSpacing: 3,
            fontSize: 14,
            textTransform: "uppercase",
          }}
        >
          Action... Loading Scene
        </Typography>
      </motion.div>
    </Box>
  );
}
