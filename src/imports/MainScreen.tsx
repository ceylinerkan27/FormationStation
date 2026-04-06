import svgPaths from "./svg-bgv1bcfrqu";

function TopBar() {
  return (
    <div className="absolute contents left-0 top-0" data-name="top bar">
      <div className="absolute flex h-[1366px] items-center justify-center left-0 top-0 w-[67px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="bg-[#8b72be] h-[67px] w-[1366px]" data-name="top blue bar" />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[300px] items-center justify-center left-[33.5px] top-[683px] w-[29px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[29px] justify-center leading-[0] not-italic relative text-[24px] text-center text-white w-[300px]">
            <p className="leading-[normal]">Hip Hop Piece Formations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Notes() {
  return (
    <div className="absolute contents left-[165px] top-[-257px]" data-name="notes">
      <div className="absolute flex h-[250px] items-center justify-center left-[165px] top-[-257px] w-[624px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="bg-[#28292a] h-[624px] rounded-[16px] w-[250px]" data-name="notes" />
        </div>
      </div>
      <div className="absolute flex h-[74px] items-center justify-center left-[176px] top-[-95px] w-[25px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <p className="font-['Inter:Regular',sans-serif] font-normal h-[25px] leading-[19.5px] not-italic relative text-[#b4b1b1] text-[20px] tracking-[0.52px] w-[74px]">Notes</p>
        </div>
      </div>
    </div>
  );
}

function NotesFilledIn() {
  return (
    <div className="absolute contents left-[165px] top-[-257px]" data-name="notes filled in">
      <div className="absolute flex h-[250px] items-center justify-center left-[165px] top-[-257px] w-[624px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="bg-[#28292a] h-[624px] opacity-0 rounded-[16px] w-[250px]" data-name="notes" />
        </div>
      </div>
      <div className="absolute flex h-[221px] items-center justify-center left-[224px] top-[-242px] w-[83px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <p className="font-['Inter:Regular',sans-serif] font-normal h-[83px] leading-[19.5px] not-italic opacity-0 relative text-[#b4b1b1] text-[18px] tracking-[0.52px] w-[221px]">anne lets bob move first and then goes around carl</p>
        </div>
      </div>
      <div className="absolute flex h-[74px] items-center justify-center left-[176px] top-[-95px] w-[25px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <p className="font-['Inter:Regular',sans-serif] font-normal h-[25px] leading-[19.5px] not-italic opacity-0 relative text-[#b4b1b1] text-[20px] tracking-[0.52px] w-[74px]">Notes</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col h-[624px] items-start overflow-clip relative w-[884px]">
      <div className="bg-[#28292a] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] w-full" data-name="stage">
        <div aria-hidden="true" className="absolute border-3 border-[#8b72be] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
    </div>
  );
}

function Stage() {
  return (
    <div className="absolute contents left-[165px] top-[-257px]" data-name="stage">
      <Notes />
      <NotesFilledIn />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[188px] items-center justify-center left-[810px] top-[1814px] w-[42px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[42px] justify-center leading-[0] not-italic relative text-[#8b8b8b] text-[24px] text-center w-[188px]">
            <p className="leading-[normal]">AUDIENCE</p>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[884px] items-center justify-center left-[165px] top-[1384px] w-[624px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function TimeTicMarks() {
  return (
    <div className="absolute h-[1020px] left-[7px] top-0 w-[101px]" data-name="time tic marks">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 1020">
        <g id="time tic marks">
          <line id="Line 7" stroke="var(--stroke-0, white)" x1="10.5" x2="90.5" y1="169.5" y2="169.5" />
          <line id="Line 6" stroke="var(--stroke-0, white)" x1="10.5" x2="90.5" y1="339.5" y2="339.5" />
          <line id="Line 5" stroke="var(--stroke-0, white)" x1="10.5" x2="90.5" y1="509.5" y2="509.5" />
          <line id="Line 4" stroke="var(--stroke-0, white)" x1="10.5" x2="90.5" y1="679.5" y2="679.5" />
          <line id="Line 3" stroke="var(--stroke-0, white)" x1="10.5" x2="90.5" y1="849.5" y2="849.5" />
        </g>
      </svg>
    </div>
  );
}

function TimeTicNums() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[128px] h-[727px] items-center justify-end left-0 top-[123px] w-[13px]" data-name="time tic nums">
      <div className="flex h-[42px] items-center justify-center relative shrink-0 w-[18px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative text-[#b4b1b1] text-[15px] text-center whitespace-nowrap">
            <p className="leading-[normal]">00:50</p>
          </div>
        </div>
      </div>
      <div className="flex h-[42px] items-center justify-center relative shrink-0 w-[18px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative text-[#b4b1b1] text-[15px] text-center whitespace-nowrap">
            <p className="leading-[normal]">00:40</p>
          </div>
        </div>
      </div>
      <div className="flex h-[42px] items-center justify-center relative shrink-0 w-[18px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative text-[#b4b1b1] text-[15px] text-center whitespace-nowrap">
            <p className="leading-[normal]">00:30</p>
          </div>
        </div>
      </div>
      <div className="flex h-[42px] items-center justify-center relative shrink-0 w-[18px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative text-[#b4b1b1] text-[15px] text-center whitespace-nowrap">
            <p className="leading-[normal]">00:20</p>
          </div>
        </div>
      </div>
      <div className="flex h-[40px] items-center justify-center relative shrink-0 w-[18px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative text-[#b4b1b1] text-[15px] text-center whitespace-nowrap">
            <p className="leading-[normal]">00:10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormationsBottomBar() {
  return (
    <div className="absolute contents left-0 top-0" data-name="formations bottom bar">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[144px] items-center justify-center left-[26px] top-[1091px] w-[38px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[38px] justify-center leading-[0] not-italic relative text-[#8b8b8b] text-[24px] text-center w-[144px]">
            <p className="leading-[normal]">Formation</p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[108px] items-center justify-center left-[85.5px] top-[1073px] w-[41px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[41px] justify-center leading-[0] not-italic relative text-[#8b8b8b] text-[24px] text-center w-[108px]">
            <p className="leading-[normal]">Audio</p>
          </div>
        </div>
      </div>
      <TimeTicMarks />
      <div className="absolute flex h-[1019px] items-center justify-center left-[56.85px] top-0 w-[1.151px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-90.06deg]">
          <div className="h-0 relative w-[1019px]" data-name="horiz line">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1019 1">
                <line id="horiz line" stroke="var(--stroke-0, white)" x2="1019" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-0 left-[7px] top-[1020px] w-[101px]" data-name="first vertical line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 1">
            <line id="first vertical line" stroke="var(--stroke-0, white)" x2="101" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <TimeTicNums />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[1163px] left-[876px] top-[102px] w-[108px]">
      <FormationsBottomBar />
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="search">
          <path d={svgPaths.p3d886100} id="Vector" stroke="var(--stroke-0, #888888)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
          <path d={svgPaths.p2acd2800} id="Vector_2" stroke="var(--stroke-0, #888888)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
        </g>
      </svg>
    </div>
  );
}

function SearchForPrev() {
  return (
    <div className="bg-[#2a2a2a] h-[40px] relative rounded-[10px] shrink-0 w-[44px]" data-name="search for prev">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.571px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.571px] relative size-full">
        <Search />
      </div>
    </div>
  );
}

function Span() {
  return <div className="bg-[#e03535] rounded-[7px] shrink-0 size-[14px]" data-name="span" />;
}

function Record() {
  return (
    <div className="bg-[#2a2a2a] h-[40px] relative rounded-[10px] shrink-0 w-[44px]" data-name="record">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.571px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.571px] relative size-full">
        <Span />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d={svgPaths.p1da4f480} id="Vector" stroke="var(--stroke-0, #888888)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
        </g>
      </svg>
    </div>
  );
}

function Play() {
  return (
    <div className="bg-[#2a2a2a] h-[40px] relative rounded-[10px] shrink-0 w-[44px]" data-name="play">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.571px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.571px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d={svgPaths.p1a2a9d80} id="Vector" stroke="var(--stroke-0, #888888)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
          <path d={svgPaths.p2ec70180} id="Vector_2" stroke="var(--stroke-0, #888888)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.275" />
        </g>
      </svg>
    </div>
  );
}

function People() {
  return (
    <div className="bg-[#2a2a2a] h-[40px] relative rounded-[10px] shrink-0 w-[44px]" data-name="people">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.571px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.571px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="h-[40px] relative shrink-0 w-[200px]" data-name="buttons">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <SearchForPrev />
        <Record />
        <Play />
        <People />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="absolute h-[19.5px] left-0 top-[3.25px] w-[90.732px]" data-name="span">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#999] text-[13px] top-[-0.43px] whitespace-nowrap">path edit mode</p>
    </div>
  );
}

function Span2() {
  return <div className="bg-white h-[20px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.4)] shrink-0 w-full" data-name="span" />;
}

function Slider() {
  return (
    <div className="absolute bg-[#3a3a3a] content-stretch flex flex-col h-[26px] items-start left-[100.73px] pl-[3px] pr-[23px] pt-[3px] rounded-[13px] top-0 w-[46px]" data-name="slider">
      <Span2 />
    </div>
  );
}

function PathEditMode() {
  return (
    <div className="h-[26px] relative shrink-0 w-[146.732px]" data-name="path edit mode">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span1 />
        <Slider />
      </div>
    </div>
  );
}

function ButtonsTopBar() {
  return (
    <div className="content-stretch flex h-[56px] items-center justify-between pb-[0.571px] pl-[16px] pr-[20px] relative w-[1366px]" data-name="buttons top bar">
      <div aria-hidden="true" className="absolute border-[#252525] border-b-[0.571px] border-solid inset-0 pointer-events-none" />
      <Buttons />
      <PathEditMode />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[56.571px] relative shrink-0 w-[279.429px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333] border-b-[0.571px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[16px] not-italic text-[#aaa] text-[13px] top-[17px] tracking-[0.52px] uppercase whitespace-nowrap">Layers</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#2e2e2e] h-[42.143px] relative rounded-[8px] shrink-0 w-[255.429px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.571px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[12.57px] not-italic text-[#ccc] text-[14px] top-[9.71px] whitespace-nowrap">Formation 1</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#2e2e2e] h-[42.143px] relative rounded-[8px] shrink-0 w-[255.429px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.571px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[12.57px] not-italic text-[#ccc] text-[14px] top-[9.71px] whitespace-nowrap">Formation 2</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#2e2e2e] h-[42.143px] relative rounded-[8px] shrink-0 w-[255.429px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.571px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[12.57px] not-italic text-[#ccc] text-[14px] top-[9.71px] whitespace-nowrap">Formation 3</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[279.429px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pl-[12px] pt-[12px] relative size-full">
        <Container3 />
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#252525] content-stretch flex flex-col h-[709.429px] items-start left-0 pr-[0.571px] rounded-[7px] top-0 w-[280px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333] border-r-[0.571px] border-solid inset-0 pointer-events-none rounded-[7px]" />
      <Container1 />
      <Container2 />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative size-[13px]" data-name="ChevronRight">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="ChevronRight">
          <path d={svgPaths.p23079900} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[#2e2e2e] content-stretch flex h-[64px] items-center justify-center left-[280px] pr-[0.571px] py-[0.571px] rounded-br-[8px] rounded-tr-[8px] top-[322.71px] w-[22px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-b-[0.571px] border-r-[0.571px] border-solid border-t-[0.571px] inset-0 pointer-events-none rounded-br-[8px] rounded-tr-[8px] shadow-[2px_0px_8px_0px_rgba(0,0,0,0.4)]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[718px] overflow-clip relative w-[302px]">
      <Container />
      <Container6 />
    </div>
  );
}

export default function MainScreen() {
  return (
    <div className="bg-[#1d1d1d] relative size-full" data-name="main screen" style={{ containerType: "size" }}>
      <TopBar />
      <Stage />
      <Frame2 />
      <div className="absolute flex h-[1366px] items-center justify-center left-[67px] top-0 w-[56px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "85" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <ButtonsTopBar />
        </div>
      </div>
      <div className="absolute flex h-[302px] items-center justify-center left-[153px] top-[1343px] w-[718px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "106" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Frame />
        </div>
      </div>
    </div>
  );
}