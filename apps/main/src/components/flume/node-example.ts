import { NodeMap } from 'flume'

export const exampleNodes: NodeMap = {
  swnjGFh5KB: {
    x: 150,
    y: -150,
    type: 'homepage',
    width: 170,
    connections: {
      inputs: {
        title: [
          {
            nodeId: '5xkLkUl8JX',
            portName: 'joinedText',
          },
        ],
        showSignup: [
          {
            nodeId: 'V2po9Jn2wk',
            portName: 'boolean',
          },
        ],
      },
      outputs: {},
    },
    inputData: {
      title: {
        string: '',
      },
      description: {
        string: 'Thanks for visiting my website!',
      },
      showSignup: {
        boolean: false,
      },
      copyrightYear: {
        number: 2020,
      },
    },
    root: true,
    id: 'swnjGFh5KB',
  },
  KXjnHEhWny: {
    id: 'KXjnHEhWny',
    x: -300,
    y: -100,
    type: 'user',
    width: 130,
    connections: {
      inputs: {},
      outputs: {
        firstName: [
          {
            nodeId: '5xkLkUl8JX',
            portName: 'string2',
          },
        ],
        isLoggedIn: [
          {
            nodeId: 'V2po9Jn2wk',
            portName: 'boolean',
          },
        ],
      },
    },
    inputData: {},
  },
  '5xkLkUl8JX': {
    id: '5xkLkUl8JX',
    x: -90,
    y: -200,
    type: 'joinText',
    width: 160,
    connections: {
      inputs: {
        string2: [
          {
            nodeId: 'KXjnHEhWny',
            portName: 'firstName',
          },
        ],
      },
      outputs: {
        joinedText: [
          {
            nodeId: 'swnjGFh5KB',
            portName: 'title',
          },
        ],
      },
    },
    inputData: {
      string1: {
        string: 'Welcome ',
      },
      string2: {
        string: '',
      },
    },
  },
  V2po9Jn2wk: {
    id: 'V2po9Jn2wk',
    x: -80,
    y: 10,
    type: 'reverseBoolean',
    width: 140,
    connections: {
      inputs: {
        boolean: [
          {
            nodeId: 'KXjnHEhWny',
            portName: 'isLoggedIn',
          },
        ],
      },
      outputs: {
        boolean: [
          {
            nodeId: 'swnjGFh5KB',
            portName: 'showSignup',
          },
        ],
      },
    },
    inputData: {
      boolean: {
        boolean: false,
      },
    },
  },
}
