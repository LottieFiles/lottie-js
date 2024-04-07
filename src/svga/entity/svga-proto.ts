export default {
  nested: {
    com: {
      nested: {
        opensource: {
          nested: {
            svga: {
              options: {
                objc_class_prefix: 'SVGAProto',
                java_package: 'com.opensource.svgaplayer',
              },
              nested: {
                MovieParams: {
                  fields: {
                    viewBoxWidth: {
                      type: 'float',
                      id: 1,
                    },
                    viewBoxHeight: {
                      type: 'float',
                      id: 2,
                    },
                    fps: {
                      type: 'int32',
                      id: 3,
                    },
                    frames: {
                      type: 'int32',
                      id: 4,
                    },
                  },
                },
                SpriteEntity: {
                  fields: {
                    imageKey: {
                      type: 'string',
                      id: 1,
                    },
                    frames: {
                      rule: 'repeated',
                      type: 'FrameEntity',
                      id: 2,
                    },
                  },
                },
                Layout: {
                  fields: {
                    x: {
                      type: 'float',
                      id: 1,
                    },
                    y: {
                      type: 'float',
                      id: 2,
                    },
                    width: {
                      type: 'float',
                      id: 3,
                    },
                    height: {
                      type: 'float',
                      id: 4,
                    },
                  },
                },
                Transform: {
                  fields: {
                    a: {
                      type: 'float',
                      id: 1,
                    },
                    b: {
                      type: 'float',
                      id: 2,
                    },
                    c: {
                      type: 'float',
                      id: 3,
                    },
                    d: {
                      type: 'float',
                      id: 4,
                    },
                    tx: {
                      type: 'float',
                      id: 5,
                    },
                    ty: {
                      type: 'float',
                      id: 6,
                    },
                  },
                },
                ShapeEntity: {
                  oneofs: {
                    args: {
                      oneof: ['shape', 'rect', 'ellipse'],
                    },
                  },
                  fields: {
                    type: {
                      type: 'ShapeType',
                      id: 1,
                    },
                    shape: {
                      type: 'ShapeArgs',
                      id: 2,
                    },
                    rect: {
                      type: 'RectArgs',
                      id: 3,
                    },
                    ellipse: {
                      type: 'EllipseArgs',
                      id: 4,
                    },
                    styles: {
                      type: 'ShapeStyle',
                      id: 10,
                    },
                    transform: {
                      type: 'Transform',
                      id: 11,
                    },
                  },
                  nested: {
                    ShapeType: {
                      values: {
                        SHAPE: 0,
                        RECT: 1,
                        ELLIPSE: 2,
                        KEEP: 3,
                      },
                    },
                    ShapeArgs: {
                      fields: {
                        d: {
                          type: 'string',
                          id: 1,
                        },
                      },
                    },
                    RectArgs: {
                      fields: {
                        x: {
                          type: 'float',
                          id: 1,
                        },
                        y: {
                          type: 'float',
                          id: 2,
                        },
                        width: {
                          type: 'float',
                          id: 3,
                        },
                        height: {
                          type: 'float',
                          id: 4,
                        },
                        cornerRadius: {
                          type: 'float',
                          id: 5,
                        },
                      },
                    },
                    EllipseArgs: {
                      fields: {
                        x: {
                          type: 'float',
                          id: 1,
                        },
                        y: {
                          type: 'float',
                          id: 2,
                        },
                        radiusX: {
                          type: 'float',
                          id: 3,
                        },
                        radiusY: {
                          type: 'float',
                          id: 4,
                        },
                      },
                    },
                    ShapeStyle: {
                      fields: {
                        fill: {
                          type: 'RGBAColor',
                          id: 1,
                        },
                        stroke: {
                          type: 'RGBAColor',
                          id: 2,
                        },
                        strokeWidth: {
                          type: 'float',
                          id: 3,
                        },
                        lineCap: {
                          type: 'LineCap',
                          id: 4,
                        },
                        lineJoin: {
                          type: 'LineJoin',
                          id: 5,
                        },
                        miterLimit: {
                          type: 'float',
                          id: 6,
                        },
                        lineDashI: {
                          type: 'float',
                          id: 7,
                        },
                        lineDashII: {
                          type: 'float',
                          id: 8,
                        },
                        lineDashIII: {
                          type: 'float',
                          id: 9,
                        },
                      },
                      nested: {
                        RGBAColor: {
                          fields: {
                            r: {
                              type: 'float',
                              id: 1,
                            },
                            g: {
                              type: 'float',
                              id: 2,
                            },
                            b: {
                              type: 'float',
                              id: 3,
                            },
                            a: {
                              type: 'float',
                              id: 4,
                            },
                          },
                        },
                        LineCap: {
                          values: {
                            LineCap_BUTT: 0,
                            LineCap_ROUND: 1,
                            LineCap_SQUARE: 2,
                          },
                        },
                        LineJoin: {
                          values: {
                            LineJoin_MITER: 0,
                            LineJoin_ROUND: 1,
                            LineJoin_BEVEL: 2,
                          },
                        },
                      },
                    },
                  },
                },
                FrameEntity: {
                  fields: {
                    alpha: {
                      type: 'float',
                      id: 1,
                    },
                    layout: {
                      type: 'Layout',
                      id: 2,
                    },
                    transform: {
                      type: 'Transform',
                      id: 3,
                    },
                    clipPath: {
                      type: 'string',
                      id: 4,
                    },
                    shapes: {
                      rule: 'repeated',
                      type: 'ShapeEntity',
                      id: 5,
                    },
                  },
                },
                MovieEntity: {
                  fields: {
                    version: {
                      type: 'string',
                      id: 1,
                    },
                    params: {
                      type: 'MovieParams',
                      id: 2,
                    },
                    images: {
                      keyType: 'string',
                      type: 'bytes',
                      id: 3,
                    },
                    sprites: {
                      rule: 'repeated',
                      type: 'SpriteEntity',
                      id: 4,
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
};
