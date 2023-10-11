import { SentimentSatisfied } from '@mui/icons-material'
import { Box } from '@mui/joy'

const SmileMenu = () => {
	return (
		<Box sx={{
			width: "3.5rem",
			height: "3.5rem",
			display: 'flex',
			justifyContent: "center",
			alignItems: "center",
			flexShrink: 0
		}}>
      <SentimentSatisfied />
    </Box>
  );
}

export default SmileMenu