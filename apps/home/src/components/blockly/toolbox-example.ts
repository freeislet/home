const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Logic',
      categorystyle: 'logic_category',
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'logic_compare',
        },
        {
          kind: 'block',
          type: 'logic_operation',
        },
        {
          kind: 'block',
          type: 'logic_negate',
        },
        {
          kind: 'block',
          type: 'logic_boolean',
        },
        {
          kind: 'block',
          type: 'logic_null',
        },
        {
          kind: 'block',
          type: 'logic_ternary',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Loops',
      categorystyle: 'loop_category',
      contents: [
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '10',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_whileUntil',
        },
        {
          kind: 'block',
          type: 'controls_for',
          inputs: {
            FROM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1',
                },
              },
            },
            TO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '10',
                },
              },
            },
            BY: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_forEach',
        },
        {
          kind: 'block',
          type: 'controls_flow_statements',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Math',
      categorystyle: 'math_category',
      contents: [
        {
          kind: 'block',
          type: 'math_number',
          fields: {
            NUM: '123',
          },
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          inputs: {
            A: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1',
                },
              },
            },
            B: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_single',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '9',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_trig',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '45',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_constant',
        },
        {
          kind: 'block',
          type: 'math_number_property',
          inputs: {
            NUMBER_TO_CHECK: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '0',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_round',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '3.1',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_on_list',
        },
        {
          kind: 'block',
          type: 'math_modulo',
          inputs: {
            DIVIDEND: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '64',
                },
              },
            },
            DIVISOR: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '10',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_constrain',
          inputs: {
            VALUE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '50',
                },
              },
            },
            LOW: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1',
                },
              },
            },
            HIGH: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '100',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_random_int',
          inputs: {
            FROM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1',
                },
              },
            },
            TO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '100',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_random_float',
        },
        {
          kind: 'block',
          type: 'math_atan2',
          inputs: {
            X: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1',
                },
              },
            },
            Y: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '1',
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'category',
      name: 'Text',
      categorystyle: 'text_category',
      contents: [
        {
          kind: 'block',
          type: 'text',
        },
        {
          kind: 'block',
          type: 'text_join',
        },
        {
          kind: 'block',
          type: 'text_append',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_length',
          inputs: {
            VALUE: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_isEmpty',
          inputs: {
            VALUE: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: null,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_indexOf',
          inputs: {
            VALUE: {
              block: {
                type: 'variables_get',
                fields: {
                  VAR: '{textVariable}',
                },
              },
            },
            FIND: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_charAt',
          inputs: {
            VALUE: {
              block: {
                type: 'variables_get',
                fields: {
                  VAR: '{textVariable}',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_getSubstring',
          inputs: {
            STRING: {
              block: {
                type: 'variables_get',
                fields: {
                  VAR: '{textVariable}',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_changeCase',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_trim',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_print',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'text_prompt_ext',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'category',
      name: 'Lists',
      categorystyle: 'list_category',
      contents: [
        {
          kind: 'block',
          type: 'lists_create_with',
          extraState: {
            itemCount: '0',
          },
        },
        {
          kind: 'block',
          type: 'lists_create_with',
        },
        {
          kind: 'block',
          type: 'lists_repeat',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '5',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'lists_length',
        },
        {
          kind: 'block',
          type: 'lists_isEmpty',
        },
        {
          kind: 'block',
          type: 'lists_indexOf',
          inputs: {
            VALUE: {
              block: {
                type: 'variables_get',
                fields: {
                  VAR: '{listVariable}',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'lists_getIndex',
          inputs: {
            VALUE: {
              block: {
                type: 'variables_get',
                fields: {
                  VAR: '{listVariable}',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'lists_setIndex',
          inputs: {
            LIST: {
              block: {
                type: 'variables_get',
                fields: {
                  VAR: '{listVariable}',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'lists_getSublist',
          inputs: {
            LIST: {
              block: {
                type: 'variables_get',
                fields: {
                  VAR: '{listVariable}',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'lists_split',
          inputs: {
            DELIM: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: ',',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'lists_sort',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Colour',
      categorystyle: 'colour_category',
      contents: [
        {
          kind: 'block',
          type: 'colour_picker',
        },
        {
          kind: 'block',
          type: 'colour_random',
        },
        {
          kind: 'block',
          type: 'colour_rgb',
          inputs: {
            RED: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '100',
                },
              },
            },
            GREEN: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '50',
                },
              },
            },
            BLUE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '0',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'colour_blend',
          inputs: {
            COLOUR1: {
              shadow: {
                type: 'colour_picker',
                fields: {
                  COLOUR: '#ff0000',
                },
              },
            },
            COLOUR2: {
              shadow: {
                type: 'colour_picker',
                fields: {
                  COLOUR: '#3333ff',
                },
              },
            },
            RATIO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: '0.5',
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'sep',
    },
    {
      kind: 'category',
      name: 'Variables',
      categorystyle: 'variable_category',
      contents: [],
      custom: 'VARIABLE',
    },
    {
      kind: 'category',
      name: 'Functions',
      categorystyle: 'procedure_category',
      contents: [],
      custom: 'PROCEDURE',
    },
    {
      kind: 'sep',
    },
    {
      kind: 'category',
      name: 'Library',
      expanded: 'true',
      contents: [
        {
          kind: 'category',
          name: 'Randomize',
          contents: [
            {
              kind: 'block',
              type: 'procedures_defnoreturn',
              extraState: {
                params: [
                  {
                    name: 'list',
                  },
                ],
              },
              icons: {
                comment: {
                  text: 'Describe this function...',
                  pinned: false,
                  height: 80,
                  width: 160,
                },
              },
              fields: {
                NAME: 'randomize',
              },
              inputs: {
                STACK: {
                  block: {
                    type: 'controls_for',
                    fields: {
                      VAR: {
                        name: 'x',
                      },
                    },
                    inputs: {
                      FROM: {
                        block: {
                          type: 'math_number',
                          fields: {
                            NUM: 1,
                          },
                        },
                      },
                      TO: {
                        block: {
                          type: 'lists_length',
                          inline: false,
                          inputs: {
                            VALUE: {
                              block: {
                                type: 'variables_get',
                                fields: {
                                  VAR: {
                                    name: 'list',
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      BY: {
                        block: {
                          type: 'math_number',
                          fields: {
                            NUM: 1,
                          },
                        },
                      },
                      DO: {
                        block: {
                          type: 'variables_set',
                          inline: false,
                          fields: {
                            VAR: {
                              name: 'y',
                            },
                          },
                          inputs: {
                            VALUE: {
                              block: {
                                type: 'math_random_int',
                                inputs: {
                                  FROM: {
                                    block: {
                                      type: 'math_number',
                                      fields: {
                                        NUM: 1,
                                      },
                                    },
                                  },
                                  TO: {
                                    block: {
                                      type: 'lists_length',
                                      inline: false,
                                      inputs: {
                                        VALUE: {
                                          block: {
                                            type: 'variables_get',
                                            fields: {
                                              VAR: {
                                                name: 'list',
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          next: {
                            block: {
                              type: 'variables_set',
                              inline: false,
                              fields: {
                                VAR: {
                                  name: 'temp',
                                },
                              },
                              inputs: {
                                VALUE: {
                                  block: {
                                    type: 'lists_getIndex',
                                    fields: {
                                      MODE: 'GET',
                                      WHERE: 'FROM_START',
                                    },
                                    inputs: {
                                      VALUE: {
                                        block: {
                                          type: 'variables_get',
                                          fields: {
                                            VAR: {
                                              name: 'list',
                                            },
                                          },
                                        },
                                      },
                                      AT: {
                                        block: {
                                          type: 'variables_get',
                                          fields: {
                                            VAR: {
                                              name: 'y',
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              next: {
                                block: {
                                  type: 'lists_setIndex',
                                  inline: false,
                                  fields: {
                                    MODE: 'SET',
                                    WHERE: 'FROM_START',
                                  },
                                  inputs: {
                                    LIST: {
                                      block: {
                                        type: 'variables_get',
                                        fields: {
                                          VAR: {
                                            name: 'list',
                                          },
                                        },
                                      },
                                    },
                                    AT: {
                                      block: {
                                        type: 'variables_get',
                                        fields: {
                                          VAR: {
                                            name: 'y',
                                          },
                                        },
                                      },
                                    },
                                    TO: {
                                      block: {
                                        type: 'lists_getIndex',
                                        fields: {
                                          MODE: 'GET',
                                          WHERE: 'FROM_START',
                                        },
                                        inputs: {
                                          VALUE: {
                                            block: {
                                              type: 'variables_get',
                                              fields: {
                                                VAR: {
                                                  name: 'list',
                                                },
                                              },
                                            },
                                          },
                                          AT: {
                                            block: {
                                              type: 'variables_get',
                                              fields: {
                                                VAR: {
                                                  name: 'x',
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                  next: {
                                    block: {
                                      type: 'lists_setIndex',
                                      inline: false,
                                      fields: {
                                        MODE: 'SET',
                                        WHERE: 'FROM_START',
                                      },
                                      inputs: {
                                        LIST: {
                                          block: {
                                            type: 'variables_get',
                                            fields: {
                                              VAR: {
                                                name: 'list',
                                              },
                                            },
                                          },
                                        },
                                        AT: {
                                          block: {
                                            type: 'variables_get',
                                            fields: {
                                              VAR: {
                                                name: 'x',
                                              },
                                            },
                                          },
                                        },
                                        TO: {
                                          block: {
                                            type: 'variables_get',
                                            fields: {
                                              VAR: {
                                                name: 'temp',
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        {
          kind: 'category',
          name: 'Jabberwocky',
          contents: [
            {
              kind: 'block',
              type: 'text_print',
              inputs: {
                TEXT: {
                  block: {
                    type: 'text',
                    fields: {
                      TEXT: "'Twas brillig, and the slithy toves",
                    },
                  },
                },
              },
              next: {
                block: {
                  type: 'text_print',
                  inputs: {
                    TEXT: {
                      block: {
                        type: 'text',
                        fields: {
                          TEXT: '  Did gyre and gimble in the wabe:',
                        },
                      },
                    },
                  },
                  next: {
                    block: {
                      type: 'text_print',
                      inputs: {
                        TEXT: {
                          block: {
                            type: 'text',
                            fields: {
                              TEXT: 'All mimsy were the borogroves,',
                            },
                          },
                        },
                      },
                      next: {
                        block: {
                          type: 'text_print',
                          inputs: {
                            TEXT: {
                              block: {
                                type: 'text',
                                fields: {
                                  TEXT: '  And the mome raths outgrabe.',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              kind: 'block',
              type: 'text_print',
              inputs: {
                TEXT: {
                  block: {
                    type: 'text',
                    fields: {
                      TEXT: '"Beware the Jabberwock, my son!',
                    },
                  },
                },
              },
              next: {
                block: {
                  type: 'text_print',
                  inputs: {
                    TEXT: {
                      block: {
                        type: 'text',
                        fields: {
                          TEXT: '  The jaws that bite, the claws that catch!',
                        },
                      },
                    },
                  },
                  next: {
                    block: {
                      type: 'text_print',
                      inputs: {
                        TEXT: {
                          block: {
                            type: 'text',
                            fields: {
                              TEXT: 'Beware the Jubjub bird, and shun',
                            },
                          },
                        },
                      },
                      next: {
                        block: {
                          type: 'text_print',
                          inputs: {
                            TEXT: {
                              block: {
                                type: 'text',
                                fields: {
                                  TEXT: '  The frumious Bandersnatch!"',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
  ],
}

export default toolbox
