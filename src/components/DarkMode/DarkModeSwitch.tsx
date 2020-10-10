import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/core'

interface Props {

}

export const DarkModeSwitch: React.FC<Props> = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark' 
    return (
      <Switch
      mx={'15px'}
      mt={'3px'}
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
    );
}