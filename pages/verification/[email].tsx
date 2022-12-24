import { EmailIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { email } = router.query

  return (
    <Center className="h-screen bg-gray-50 dark:bg-black/60">
      <Box className="w-3/4">
        <EmailIcon fontSize={22} />
        <Heading mb={4}>Verifique seu e-mail</Heading>
        <Text fontSize="xl">
          Paystack helps businesses in Africa get paid by anyone, anywhere in
          the world
        </Text>
        <Button size="lg" colorScheme="green" mt="24px">
          Create a free account
        </Button>
      </Box>
    </Center>
  )
}

export default Post
