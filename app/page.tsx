"use client"

import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { erc20ABI } from 'wagmi'

export default function Home() {
  
  const { address, isConnecting, isDisconnected } = useAccount()


  const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const testAddress = "0x53B043CA414F320923eb30F92EeD8443624DD0Fa";
  

  const { data:contractReadData, isError:contractReadIsError, isLoading:contractReadIsLoading } = useContractRead({
    address: usdcAddress,
    abi: erc20ABI,
    functionName:'balanceOf' ,
    args: [testAddress]
  })

  const { config } = usePrepareContractWrite({
    address: usdcAddress,
    abi: erc20ABI,
    functionName: 'transfer',
    args:[testAddress,BigInt(0)]
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)


  return (
    <Flex mt={"50px"} textAlign={"center"} alignItems={'center'} flexDirection={'column'}>
      <Text fontWeight={"semibold"} mb={"0px"} fontSize={"24px"}>
        Testing Rainbowkit
      </Text>
      <ConnectButton />
      <Text mt={'20px'}>Wallet Address: {address}</Text>
      <Text mt={"40px"} mb={"5px"}>
        Get USDC balance of test user (Polygon)
      </Text>
      <Text>Balance: {contractReadData?.toString()}</Text>
      <Button mt={"40px"} mb={"5px"} onClick={() => write?.()}>
        Send USDC (Ethereum)
      </Button>
    </Flex>
  )
}
