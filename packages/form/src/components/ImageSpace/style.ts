﻿import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';


const genBizStyle: GenerateStyle<BizImageSpaceToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      width: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      flexDirection: 'column',
      overflowX: 'auto',
      backgroundColor: token.colorBgPage,
      '&-header': {

      },
      '&-body': {
        display: 'flex',
        flex: '1 1',
        overflowY: 'hidden',
      },
      '&-footer': {
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: token.colorBgFooter,
        '&-selectOk': {
          height: '36px',
          width: '107px',
          marginRight: '25px',
        }
      },
      '&-aside': {
        width: '158px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        padding: '6px 6px 0',
        height: '100%',
        flexShrink: 0,
        backgroundColor: token.colorBgSide,
      },
      '&-treeDom': {
        flex: '1 1',
        overflow: 'auto',
        padding: '0 8px 0 6px',
        maxHeight: 'calc(100% - 1px)',
        '&::-webkit-scrollbar': {
          width: '7.5px',
          height: ' 7.5px',
          borderRadius: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          width: '7.5px',
          height: '7.5px',
          borderRadius: '6px',
          '&:hover': {
            backgroundColor: token.colorBorder,
          }
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
          padding: '0',
          width: '4px',
          height: '4px',
          borderRadius: '6px',
        }
      },
      '&-dashboard': {
        padding: '6px 0 0 24px',
        boxSizing: 'border-box',
        maxHeight: '100vh',
        height: '100%',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: '685px',
        position: 'relative',
        backgroundColor: token.colorBgDashboard,

        '&-header': {
          margin: '5px 0 8px',
          height: '35px',
          display: 'flex',
          '&-actions': {
            display: 'flex',
            flexShrink: 0,
            width: '100%',
            height: '30px',
            alignItems: 'center',
            transform: 'translateX(-8px)',
            '&-left': {
              flex: '1 1',
              display: 'flex',
              alignItems: 'center',
              marginRight: '8px',
            },
            '&-right': {
              height: '30px'
            },
          },
        },
        '&-list': {
          boxSizing: 'border-box',
          height: '100%',
          overflowY: 'auto',
          '&-document': {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }
        },
        '&-table': {
          boxSizing: 'border-box',
          padding: '5px 0 0',
          marginTop: '9px',
          overflow: 'hidden',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          userSelect: 'none'
        }
      },
      '&-pic': {
        position: 'relative',
        width: '122px',
        height: '153px',
        margin: '10px 12px 0 0',
        '&:hover': {
          [token.componentCls]: {
            '&-pic': {
              '&-checkbox': {
                display: 'flex !important;',
              },
              '&-spec': {
                display: 'none !important;',
              },
              '&-copy': {
                display: 'block !important;',
              }
            }
          }
        },
        '&-background': {
          height: '120px',
          width: '120px',
          borderRadius: '12px',
          position: 'relative',
          display: 'inline-block',
          backgroundColor: token.colorBgPicCard,
          backgroundSize: 'contain',
          textAlign: 'center'
        },
        '&-imgBox': {
          verticalAlign: 'middle',
          display: 'table-cell',
          position: 'relative',
          textAlign: 'center',
          width: '120px',
          height: '120px',
          borderRadius: '8px',
          overflow: 'hidden',
          '&:hover': {
            [token.componentCls]: {
              '&-pic': {
                '&-ai-entry': {
                  display: 'inline-flex !important',
                },
              }
            }
          },
          'img': {
            maxHeight: '120px',
            maxWidth: '120px',
          },
        },
        '&-checkbox': {
          display: 'none',
          position: 'absolute',
          top: '13px',
          right: '10px',
          '&.checked': {
            display: 'flex',
          }
        },
        '&-ai-entry': {
          fontSize: '12px',
          display: 'none',
          position: 'absolute',
          width: '70px',
          height: '20px',
          color: '#eaeaea',
          backgroundColor: token.colorBgMask,
          top: '12px',
          left: '8px',
          borderRadius: '5px',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: '1000'
        },
        '&-controlWrap': {
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          position: 'absolute',
          left: '0',
          top: '84px',
          borderRadius: '0 0 12px 12px',
          width: '100%',
          height: '36px',
          backgroundImage: `linear-gradient(180deg, ${setAlpha(token.colorTextBase, .05)}, ${setAlpha(token.colorTextBase, .3)})`,
          boxSizing: 'border-box',
          WebkitBoxSizing: 'border-box'
        },
        '&-spec': {
          height: '14px',
          width: '30px',
          fontWeight: '400',
          fontSize: '14px',
          letterSpacing: '0',
          lineHeight: '14px',
          color: token.colorControlText
        },
        '&-copy': {
          display: 'none',
          marginRight: '8px',
          cursor: 'pointer',
          color: token.colorControlText
        },
        '&-fullView': {
          marginLeft: 'auto',
          cursor: 'pointer',
          color: token.colorControlText
        },
        '&-title': {
          '&-wrap': {
            display: 'inline-flex',
            width: '108px',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '&-svg': {
            flexShrink: 0,
            height: '16px',
            width: '16px',
            cursor: 'pointer'
          },
          '&-tip': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
            height: '18px',
            fontWeight: '400',
            fontSize: '12px',
            color: token.colorText,
            lineHeight: '18px',
            margin: '0 4px'
          }
        },
        '&-dom': {
          visibility: 'hidden',
          position: 'relative',
          width: '122px',
          height: '153px',
          margin: '10px 12px 0 0'
        }
      }
    },
  };
};

interface BizImageSpaceToken extends BizAliasToken {
  colorBgPage: string;
  colorBgFooter: string;
  colorBgDashboard: string;
  colorBgPicCard: string;
  colorBgSide: string;
  colorControlText: string;
}
export function useStyle(prefixCls?: string) {
  return useAntdStyle('BizImageSpace', (token) => {
    const bizToken: BizImageSpaceToken = {
      ...token,
      colorBgPage: token.colorBgElevated,
      colorBgFooter: token.colorBgElevated,
      colorBgDashboard: token.colorBgContainer,
      colorBgPicCard: token.colorBgLayout,
      colorBgSide: token.colorBgLayout,
      colorControlText: token.colorWhite
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}