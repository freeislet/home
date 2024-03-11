import { FlumeConfig, Colors, Controls } from 'flume'

const config = new FlumeConfig()
config
  .addPortType({
    type: 'string',
    name: 'string',
    label: 'Text',
    color: Colors.green,
    controls: [
      Controls.text({
        name: 'string',
        label: 'Text',
      }),
    ],
  })
  .addPortType({
    type: 'boolean',
    name: 'boolean',
    label: 'True/False',
    color: Colors.blue,
    controls: [
      Controls.checkbox({
        name: 'boolean',
        label: 'True/False',
      }),
    ],
  })
  .addPortType({
    type: 'number',
    name: 'number',
    label: 'Number',
    color: Colors.red,
    controls: [
      Controls.number({
        name: 'number',
        label: 'Number',
      }),
    ],
  })
  .addNodeType({
    type: 'string',
    label: 'Text',
    description: 'Outputs a string of text',
    inputs: (ports) => [ports.string()],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: 'boolean',
    label: 'True/False',
    description: 'Outputs a true/false value',
    initialWidth: 140,
    inputs: (ports) => [ports.boolean()],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: 'number',
    label: 'Number',
    description: 'Outputs a numeric value',
    initialWidth: 160,
    inputs: (ports) => [ports.number()],
    outputs: (ports) => [ports.number()],
  })
  .addRootNodeType({
    type: 'homepage',
    label: 'Homepage',
    initialWidth: 170,
    inputs: (ports) => [
      ports.string({
        name: 'title',
        label: 'Title',
      }),
      ports.string({
        name: 'description',
        label: 'Description',
      }),
      ports.boolean({
        name: 'showSignup',
        label: 'Show Signup',
      }),
      ports.number({
        name: 'copyrightYear',
        label: 'Copyright Year',
      }),
    ],
  })
  .addNodeType({
    type: 'user',
    label: 'User',
    description: 'Outputs attributes of the current user',
    initialWidth: 130,
    outputs: (ports) => [
      ports.string({
        name: 'firstName',
        label: 'First Name',
      }),
      ports.string({
        name: 'lastName',
        label: 'Last Name',
      }),
      ports.boolean({
        name: 'isLoggedIn',
        label: 'Is Logged-In',
      }),
      ports.boolean({
        name: 'isAdmin',
        label: 'Is Admin',
      }),
    ],
  })
  .addNodeType({
    type: 'joinText',
    label: 'Join Text',
    description: 'Combines two strings of text into one string',
    initialWidth: 160,
    inputs: (ports) => [
      ports.string({
        name: 'string1',
        label: 'First text',
      }),
      ports.string({
        name: 'string2',
        label: 'Second text',
      }),
    ],
    outputs: (ports) => [
      ports.string({
        name: 'joinedText',
        label: 'Joined Text',
      }),
    ],
  })
  .addNodeType({
    type: 'reverseBoolean',
    label: 'Reverse True/False',
    description: 'Reverses a true/false value',
    initialWidth: 140,
    inputs: (ports) => [ports.boolean()],
    outputs: (ports) => [ports.boolean()],
  })

export default config
