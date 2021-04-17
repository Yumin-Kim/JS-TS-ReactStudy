
//  export const myStory = () => <Button>Hello, World!</Button>myStory.story = {
//     parameters: {
//        design: {
//           type: 'figma',
//           url: 'https://www.figma.com/file/vNwWaUVHKcZJ0JLdQAhvo8/Untitled?node-id=0%3A1'
//        }
//     }
//  }
 import React from 'react'
import { storiesOf } from '@storybook/react'
import { WithFigma } from 'storybook-addon-figma'

storiesOf('FigmaTest')
  .add('With Figma', () => (
    <WithFigma
      url={'https://www.figma.com/file/LbcvMJxDtshDmYtdyfJfkA72/Button-Primary'}
    >
      <button>My Button</button>
    </WithFigma>
  ))