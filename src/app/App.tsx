import { useState, useRef, useEffect } from 'react';
import { Settings, Search, Play, Pause, User, Plus, ChevronRight, Minus, X, Home, Trash2, Bold, Italic, Underline, Square, Undo2 } from 'lucide-react';

// Animation state for dancer transitions
interface DancerAnimation {
  dancerId: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  type: 'move' | 'exit' | 'enter';
  exitDirection?: 'left' | 'right' | 'top' | 'bottom';
  enterDirection?: 'left' | 'right' | 'top' | 'bottom';
}

interface Dancer {
  id: string;
  name: string;
  number: number;
  color: string;
}

interface DancerPosition {
  dancerId: string;
  x: number;
  y: number;
}

interface Formation {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  notes: string;
  dancers: DancerPosition[];
}

interface AppSnapshot {
  formations: Formation[];
  dancers: Dancer[];
  selectedFormationId: string | null;
  previousFormationId: string | null;
  stageConfig: StageConfig;
}

interface StageConfig {
  width: number;
  height: number;
  verticalGridLines: number;
  horizontalGridLines: number;
}

// Home Screen Component
function HomeScreen({ onOpenProject }: { onOpenProject: () => void }) {
  return (
    <div className="size-full flex flex-col bg-[#1d1d1d] overflow-auto">
      {/* Top Purple Bar */}
      <div className="h-[67px] bg-[#8b72be] flex items-center justify-center px-6 relative">
        <h1 className="text-white text-[24px] font-normal">Formation Station</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start p-8 gap-10">
        {/* Hello World Heading */}
        <h2 className="text-[#b4b1b1] text-[48px] font-bold tracking-wider">hello world</h2>

        {/* Colors Section */}
        <div className="w-full max-w-4xl">
          <h3 className="text-[#8b8b8b] text-[20px] font-bold tracking-[0.52px] mb-4">Project Colors</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#8b72be] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#8b72be</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#1d1d1d] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#1d1d1d</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#252525] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#252525</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#2a2a2a</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#2e2e2e] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#2e2e2e</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#3a3a3a] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#3a3a3a</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#b4b1b1] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#b4b1b1</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#8b8b8b] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#8b8b8b</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#e03535] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#e03535</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-[8px] bg-[#ffffff] border border-[#3a3a3a]" />
              <span className="text-[#888] text-[12px]">#ffffff</span>
            </div>
          </div>
        </div>

        {/* Fonts Section */}
        <div className="w-full max-w-4xl">
          <h3 className="text-[#8b8b8b] text-[20px] font-bold tracking-[0.52px] mb-4">Typography</h3>
          <div className="flex flex-col gap-4">
            <div className="bg-[#252525] rounded-[8px] p-4 border border-[#3a3a3a]">
              <span className="text-[#888] text-[12px] mb-2 block">Heading 1 (24px)</span>
              <p className="text-white text-[24px] font-normal">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="bg-[#252525] rounded-[8px] p-4 border border-[#3a3a3a]">
              <span className="text-[#888] text-[12px] mb-2 block">Heading 2 (20px Bold)</span>
              <p className="text-[#b4b1b1] text-[20px] font-bold tracking-[0.52px]">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="bg-[#252525] rounded-[8px] p-4 border border-[#3a3a3a]">
              <span className="text-[#888] text-[12px] mb-2 block">Body (18px)</span>
              <p className="text-[#b4b1b1] text-[18px] leading-[19.5px] tracking-[0.52px]">The quick brown fox jumps over the lazy dog. This is body text used for notes and descriptions.</p>
            </div>
            <div className="bg-[#252525] rounded-[8px] p-4 border border-[#3a3a3a]">
              <span className="text-[#888] text-[12px] mb-2 block">Small (13px)</span>
              <p className="text-white text-[13px]">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="bg-[#252525] rounded-[8px] p-4 border border-[#3a3a3a]">
              <span className="text-[#888] text-[12px] mb-2 block">Label (12px)</span>
              <p className="text-[#ccc] text-[12px]">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </div>

        {/* Icons Section */}
        <div className="w-full max-w-4xl">
          <h3 className="text-[#8b8b8b] text-[20px] font-bold tracking-[0.52px] mb-4">Icons (Lucide React)</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Home size={24} className="text-[#8b72be]" />
              </div>
              <span className="text-[#888] text-[12px]">Home</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Settings size={24} className="text-[#888]" />
              </div>
              <span className="text-[#888] text-[12px]">Settings</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Search size={24} className="text-[#888]" />
              </div>
              <span className="text-[#888] text-[12px]">Search</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Play size={24} className="text-[#888]" />
              </div>
              <span className="text-[#888] text-[12px]">Play</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <User size={24} className="text-[#888]" />
              </div>
              <span className="text-[#888] text-[12px]">User</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Plus size={24} className="text-[#888]" />
              </div>
              <span className="text-[#888] text-[12px]">Plus</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Trash2 size={24} className="text-[#e03535]" />
              </div>
              <span className="text-[#888] text-[12px]">Trash</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Bold size={24} className="text-[#b4b1b1]" />
              </div>
              <span className="text-[#888] text-[12px]">Bold</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Italic size={24} className="text-[#b4b1b1]" />
              </div>
              <span className="text-[#888] text-[12px]">Italic</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[8px] bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center">
                <Underline size={24} className="text-[#b4b1b1]" />
              </div>
              <span className="text-[#888] text-[12px]">Underline</span>
            </div>
          </div>
        </div>

        {/* Open Project Button */}
        <button
          onClick={onOpenProject}
          className="mt-8 bg-[#8b72be] hover:bg-[#7a61ad] text-white px-8 py-4 rounded-[12px] text-[18px] font-medium transition-colors"
        >
          open new project
        </button>
      </div>
    </div>
  );
}

const DANCER_COLOR_PALETTE = [
  '#8b72be',
  '#f59e0b',
  '#ef4444',
  '#22c55e',
  '#3b82f6',
  '#ec4899',
  '#14b8a6',
  '#eab308'
];

const DEFAULT_STAGE_CONFIG: StageConfig = {
  width: 800,
  height: 500,
  verticalGridLines: 5,
  horizontalGridLines: 3
};

const STAGE_MIN_WIDTH = 320;
const STAGE_MAX_WIDTH = 1600;
const STAGE_MIN_HEIGHT = 240;
const STAGE_MAX_HEIGHT = 1000;
const GRID_MIN_LINES = 1;
const GRID_MAX_LINES = 16;

export default function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPathEditMode, setIsPathEditMode] = useState(false);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedFormationId, setSelectedFormationId] = useState<string | null>(null);
  const [previousFormationId, setPreviousFormationId] = useState<string | null>(null);
  const [dancerAnimations, setDancerAnimations] = useState<DancerAnimation[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [editingFormationId, setEditingFormationId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [draggedFormation, setDraggedFormation] = useState<{ id: string; startX: number; startDuration: number } | null>(null);
  
  const [dancers, setDancers] = useState<Dancer[]>([]);
  const [selectedDancerIds, setSelectedDancerIds] = useState<Set<string>>(new Set());
  const [draggedDancer, setDraggedDancer] = useState<{ dancerId: string; offsetX: number; offsetY: number } | null>(null);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [removalDialog, setRemovalDialog] = useState<{ dancerId: string; dancerName: string } | null>(null);
  
  const [projectTitle, setProjectTitle] = useState('Hip Hop Piece Formations');
  const [editingProjectTitle, setEditingProjectTitle] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [stageConfig, setStageConfig] = useState<StageConfig>(DEFAULT_STAGE_CONFIG);
  const [settingsDraft, setSettingsDraft] = useState<StageConfig>(DEFAULT_STAGE_CONFIG);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; formationId: string } | null>(null);
  const [formationDeleteDialog, setFormationDeleteDialog] = useState<{ formationId: string; formationName: string } | null>(null);
  const undoStackRef = useRef<AppSnapshot[]>([]);
  const [undoDepth, setUndoDepth] = useState(0);

  const [showAudioUpload, setShowAudioUpload] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [timelineContainerWidth, setTimelineContainerWidth] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordStatus, setRecordStatus] = useState<string | null>(null);
  const [playheadTime, setPlayheadTime] = useState(0);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const playStartWallRef = useRef(0);
  const playStartHeadRef = useRef(0);
  const animFrameRef = useRef(0);
  const playSessionRef = useRef(0);
  const recordingFrameRef = useRef(0);
  const recordingIntervalRef = useRef<number | null>(null);
  const recordingStopRef = useRef<(() => void) | null>(null);
  const wasPlayingOnDragRef = useRef(false);
  const playheadTimeRef = useRef(0);
  // Stable ref to formation-checking logic so RAF callback is never stale
  const checkFormationRef = useRef<(time: number) => void>(() => {});
  
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const recordingCanvasRef = useRef<HTMLCanvasElement>(null);
  const peopleDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const selectedFormation = formations.find(f => f.id === selectedFormationId);

  const clampStageWidth = (value: number) => Math.max(STAGE_MIN_WIDTH, Math.min(STAGE_MAX_WIDTH, Math.round(value)));
  const clampStageHeight = (value: number) => Math.max(STAGE_MIN_HEIGHT, Math.min(STAGE_MAX_HEIGHT, Math.round(value)));
  const clampGridLines = (value: number) => Math.max(GRID_MIN_LINES, Math.min(GRID_MAX_LINES, Math.round(value)));

  const safeStageWidth = Math.max(1, stageConfig.width);
  const safeStageHeight = Math.max(1, stageConfig.height);

  const gcd = (a: number, b: number): number => {
    let x = Math.abs(Math.round(a));
    let y = Math.abs(Math.round(b));
    while (y !== 0) {
      const tmp = y;
      y = x % y;
      x = tmp;
    }
    return x || 1;
  };

  const stageRatioLabel = (() => {
    const divisor = gcd(safeStageWidth, safeStageHeight);
    return `${Math.round(safeStageWidth / divisor)}:${Math.round(safeStageHeight / divisor)}`;
  })();

  const draftStageWidth = Math.max(1, settingsDraft.width || stageConfig.width);
  const draftStageHeight = Math.max(1, settingsDraft.height || stageConfig.height);
  const draftRatioLabel = (() => {
    const divisor = gcd(draftStageWidth, draftStageHeight);
    return `${Math.round(draftStageWidth / divisor)}:${Math.round(draftStageHeight / divisor)}`;
  })();

  const cloneFormations = (source: Formation[]) => source.map((formation) => ({
    ...formation,
    dancers: formation.dancers.map((dancerPos) => ({ ...dancerPos }))
  }));

  const cloneDancers = (source: Dancer[]) => source.map((dancer) => ({ ...dancer }));

  const pushUndoSnapshot = () => {
    const snapshot: AppSnapshot = {
      formations: cloneFormations(formations),
      dancers: cloneDancers(dancers),
      selectedFormationId,
      previousFormationId,
      stageConfig: { ...stageConfig }
    };
    undoStackRef.current.push(snapshot);
    if (undoStackRef.current.length > 100) {
      undoStackRef.current.shift();
    }
    setUndoDepth(undoStackRef.current.length);
  };

  const handleUndo = () => {
    if (isRecording) return;
    if (isPlaying) stopPlayback();
    const snapshot = undoStackRef.current.pop();
    if (!snapshot) return;
    setFormations(snapshot.formations);
    setDancers(snapshot.dancers);
    setSelectedFormationId(snapshot.selectedFormationId);
    setPreviousFormationId(snapshot.previousFormationId);
    setStageConfig(snapshot.stageConfig);
    setSettingsDraft(snapshot.stageConfig);
    setDancerAnimations([]);
    setIsAnimating(false);
    setUndoDepth(undoStackRef.current.length);
    setRecordStatus('Undid last change.');
  };

  const openSettingsDialog = () => {
    setSettingsDraft(stageConfig);
    setShowSettingsDialog(true);
  };

  const applyRatioPresetToDraft = (ratioWidth: number, ratioHeight: number) => {
    setSettingsDraft((prev) => {
      const nextHeight = clampStageHeight((prev.width / ratioWidth) * ratioHeight);
      return { ...prev, height: nextHeight };
    });
  };

  const applyStageSettings = () => {
    if (isRecording) {
      setRecordStatus('Stop recording before changing stage settings.');
      return;
    }
    if (isPlaying) {
      stopPlayback();
    }

    const normalized: StageConfig = {
      width: clampStageWidth(settingsDraft.width || stageConfig.width),
      height: clampStageHeight(settingsDraft.height || stageConfig.height),
      verticalGridLines: clampGridLines(settingsDraft.verticalGridLines || stageConfig.verticalGridLines),
      horizontalGridLines: clampGridLines(settingsDraft.horizontalGridLines || stageConfig.horizontalGridLines)
    };

    const widthChanged = normalized.width !== stageConfig.width;
    const heightChanged = normalized.height !== stageConfig.height;
    const needsPositionScale = widthChanged || heightChanged;
    const gridChanged =
      normalized.verticalGridLines !== stageConfig.verticalGridLines ||
      normalized.horizontalGridLines !== stageConfig.horizontalGridLines;

    if (!needsPositionScale && !gridChanged) {
      setShowSettingsDialog(false);
      return;
    }

    pushUndoSnapshot();

    if (needsPositionScale) {
      const prevWidth = Math.max(1, stageConfig.width);
      const prevHeight = Math.max(1, stageConfig.height);
      const nextWidth = normalized.width;
      const nextHeight = normalized.height;

      setFormations((prevFormations) => prevFormations.map((formation) => ({
        ...formation,
        dancers: formation.dancers.map((pos) => ({
          ...pos,
          x: Math.max(0, Math.min(nextWidth, (pos.x / prevWidth) * nextWidth)),
          y: Math.max(0, Math.min(nextHeight, (pos.y / prevHeight) * nextHeight))
        }))
      })));
      setDancerAnimations([]);
      setIsAnimating(false);
    }

    setStageConfig(normalized);
    setShowSettingsDialog(false);
    setRecordStatus(`Stage set to ${normalized.width}x${normalized.height} (${Math.round(normalized.width / normalized.height * 100) / 100}:1), grid ${normalized.verticalGridLines}x${normalized.horizontalGridLines}.`);
  };

  // Timeline duration: use audio duration if available, else derive from formations or default
  const formationSpanPx = formations.length > 0
    ? 40 + formations.reduce((s, f) => s + f.duration, 0)
    : 0;
  const timelineDuration = audioDuration != null
    ? audioDuration
    : Math.max(60, timelineContainerWidth > 0 ? (formationSpanPx / timelineContainerWidth) * 60 : 60);

  function getTimeInterval(secs: number): number {
    if (secs <= 30) return 5;
    if (secs <= 90) return 10;
    if (secs <= 180) return 15;
    if (secs <= 360) return 30;
    if (secs <= 900) return 60;
    return Math.ceil(secs / 8 / 60) * 60;
  }

  const timeInterval = getTimeInterval(timelineDuration);
  const timeMarkers: number[] = [];
  for (let t = timeInterval; t < timelineDuration; t += timeInterval) {
    timeMarkers.push(Math.round(t * 10) / 10);
  }

  function formatTime(secs: number): string {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Get unique dancer counts from all formations
  const uniqueDancerCounts = Array.from(
    new Set(formations.map(f => f.dancers.length))
  ).sort((a, b) => b - a); // Sort descending

  const createNewFormation = () => {
    pushUndoSnapshot();
    // Copy previous formation's dancers if there is one
    const previousFormation = formations.length > 0 ? formations[formations.length - 1] : null;
    
    const newFormation: Formation = {
      id: `formation-${Date.now()}`,
      name: `Formation ${formations.length + 1}`,
      startTime: 0,
      duration: 170,
      notes: '',
      dancers: previousFormation ? [...previousFormation.dancers] : []
    };
    setFormations([...formations, newFormation]);
    setSelectedFormationId(newFormation.id);
    // New formations at the end don't need shifts as they're placed after all others
  };

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedFormationId || !stageRef.current) return;
    
    // Check if clicking on a dancer circle
    const target = e.target as HTMLElement;
    if (target.closest('.dancer-circle')) return;
    
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(safeStageWidth, e.clientX - rect.left));
    const y = Math.max(0, Math.min(safeStageHeight, e.clientY - rect.top));
    
    pushUndoSnapshot();

    // Create new dancer
    const newDancer: Dancer = {
      id: `dancer-${Date.now()}`,
      name: `${dancers.length + 1}`,
      number: dancers.length + 1,
      color: DANCER_COLOR_PALETTE[dancers.length % DANCER_COLOR_PALETTE.length]
    };
    
    setDancers([...dancers, newDancer]);
    
    // Add dancer to current formation
    setFormations(formations.map(f => {
      if (f.id === selectedFormationId) {
        return {
          ...f,
          dancers: [...f.dancers, { dancerId: newDancer.id, x, y }]
        };
      }
      return f;
    }));
  };

  const handleDancerClick = (e: React.MouseEvent, dancerId: string) => {
    e.stopPropagation();
    const newSelected = new Set(selectedDancerIds);
    if (newSelected.has(dancerId)) {
      newSelected.delete(dancerId);
    } else {
      newSelected.add(dancerId);
    }
    setSelectedDancerIds(newSelected);
  };

  const handleDancerDragStart = (e: React.MouseEvent, dancerId: string, currentX: number, currentY: number) => {
    e.stopPropagation();
    const offsetX = e.clientX - (stageRef.current?.getBoundingClientRect().left || 0) - currentX;
    const offsetY = e.clientY - (stageRef.current?.getBoundingClientRect().top || 0) - currentY;
    pushUndoSnapshot();
    setDraggedDancer({ dancerId, offsetX, offsetY });
  };

  const handleDancerDragMove = (e: MouseEvent) => {
    if (!draggedDancer || !stageRef.current || !selectedFormationId) return;
    
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(safeStageWidth, e.clientX - rect.left - draggedDancer.offsetX));
    const y = Math.max(0, Math.min(safeStageHeight, e.clientY - rect.top - draggedDancer.offsetY));
    
    setFormations(formations.map(f => {
      if (f.id === selectedFormationId) {
        return {
          ...f,
          dancers: f.dancers.map(d => 
            d.dancerId === draggedDancer.dancerId ? { ...d, x, y } : d
          )
        };
      }
      return f;
    }));
  };

  const handleDancerDragEnd = () => {
    setDraggedDancer(null);
  };

  const getDancerInitials = (dancer: Dancer) => {
    // If name is just a number, return it
    if (dancer.name === dancer.number.toString()) {
      return dancer.name;
    }
    // Otherwise, get initials
    const parts = dancer.name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleDancerNameChange = (dancerId: string, newName: string) => {
    setDancers(dancers.map(d => d.id === dancerId ? { ...d, name: newName } : d));
  };

  const handleDancerColorChange = (dancerId: string, newColor: string) => {
    const dancer = dancers.find((d) => d.id === dancerId);
    if (!dancer || dancer.color === newColor) return;
    pushUndoSnapshot();
    setDancers(dancers.map((d) => (d.id === dancerId ? { ...d, color: newColor } : d)));
  };

  const handleDancerClickInDropdown = (dancerId: string) => {
    if (!selectedFormationId || !stageRef.current) return;
    
    // Check if dancer already exists in current formation
    const dancerExists = selectedFormation?.dancers.some(d => d.dancerId === dancerId);
    
    if (!dancerExists) {
      pushUndoSnapshot();
      // Add dancer to center of stage
      const centerX = safeStageWidth / 2;
      const centerY = safeStageHeight / 2;
      
      setFormations(formations.map(f => {
        if (f.id === selectedFormationId) {
          return {
            ...f,
            dancers: [...f.dancers, { dancerId, x: centerX, y: centerY }]
          };
        }
        return f;
      }));
    }
  };

  const handleRemoveDancer = (option: 'all' | 'this' | 'cancel') => {
    if (!removalDialog) return;

    if (option === 'all') {
      pushUndoSnapshot();
      // Remove from all formations
      setFormations((prevFormations) => prevFormations.map((f) => ({
        ...f,
        dancers: f.dancers.filter((d) => d.dancerId !== removalDialog.dancerId)
      })));
      // Remove from dancers list
      setDancers((prevDancers) => prevDancers.filter((d) => d.id !== removalDialog.dancerId));
    } else if (option === 'this' && selectedFormationId) {
      pushUndoSnapshot();
      // Remove from current formation only
      setFormations((prevFormations) => prevFormations.map((f) => {
        if (f.id === selectedFormationId) {
          return {
            ...f,
            dancers: f.dancers.filter((d) => d.dancerId !== removalDialog.dancerId)
          };
        }
        return f;
      }));
    }
    
    setRemovalDialog(null);
  };

  // Calculate the nearest stage edge for a dancer position
  const getNearestEdge = (x: number, y: number) => {
    const distances = {
      left: x,
      right: safeStageWidth - x,
      top: y,
      bottom: safeStageHeight - y
    };
    return Object.entries(distances).reduce((a, b) => 
      distances[a[0] as keyof typeof distances] < distances[b[0] as keyof typeof distances] ? a : b
    )[0] as 'left' | 'right' | 'top' | 'bottom';
  };

  // Get exit position based on nearest edge
  const getExitPosition = (x: number, y: number, edge: 'left' | 'right' | 'top' | 'bottom') => {
    const offstagePadding = Math.max(40, Math.round(Math.min(safeStageWidth, safeStageHeight) * 0.1));
    switch (edge) {
      case 'left': return { x: -offstagePadding, y };
      case 'right': return { x: safeStageWidth + offstagePadding, y };
      case 'top': return { x, y: -offstagePadding };
      case 'bottom': return { x, y: safeStageHeight + offstagePadding };
    }
  };

  // Get enter position based on nearest edge to destination
  const getEnterPosition = (x: number, y: number, edge: 'left' | 'right' | 'top' | 'bottom') => {
    const offstagePadding = Math.max(40, Math.round(Math.min(safeStageWidth, safeStageHeight) * 0.1));
    switch (edge) {
      case 'left': return { x: -offstagePadding, y };
      case 'right': return { x: safeStageWidth + offstagePadding, y };
      case 'top': return { x, y: -offstagePadding };
      case 'bottom': return { x, y: safeStageHeight + offstagePadding };
    }
  };

  const handleFormationClick = (id: string) => {
    const currentFormation = formations.find(f => f.id === selectedFormationId);
    const nextFormation = formations.find(f => f.id === id);
    
    if (!currentFormation || !nextFormation) {
      setSelectedFormationId(id);
      setPreviousFormationId(selectedFormationId);
      return;
    }

    const currentIndex = formations.findIndex(f => f.id === selectedFormationId);
    const nextIndex = formations.findIndex(f => f.id === id);

    // Only animate if clicking the directly next formation
    if (nextIndex === currentIndex + 1) {
      const animations: DancerAnimation[] = [];
      
      // Get dancer IDs in current and next formations
      const currentDancerIds = new Set(currentFormation.dancers.map(d => d.dancerId));
      const nextDancerIds = new Set(nextFormation.dancers.map(d => d.dancerId));
      
      // Dancers moving between formations
      currentFormation.dancers.forEach(dancerPos => {
        if (nextDancerIds.has(dancerPos.dancerId)) {
          // Dancer exists in both - animate to new position
          const nextPos = nextFormation.dancers.find(d => d.dancerId === dancerPos.dancerId);
          if (nextPos) {
            animations.push({
              dancerId: dancerPos.dancerId,
              startX: dancerPos.x,
              startY: dancerPos.y,
              endX: nextPos.x,
              endY: nextPos.y,
              type: 'move'
            });
          }
        } else {
          // Dancer only in current - exit animation
          const edge = getNearestEdge(dancerPos.x, dancerPos.y);
          const exitPos = getExitPosition(dancerPos.x, dancerPos.y, edge);
          animations.push({
            dancerId: dancerPos.dancerId,
            startX: dancerPos.x,
            startY: dancerPos.y,
            endX: exitPos.x,
            endY: exitPos.y,
            type: 'exit',
            exitDirection: edge
          });
        }
      });
      
      // Dancers entering (in next but not in current)
      nextFormation.dancers.forEach(dancerPos => {
        if (!currentDancerIds.has(dancerPos.dancerId)) {
          const edge = getNearestEdge(dancerPos.x, dancerPos.y);
          const enterPos = getEnterPosition(dancerPos.x, dancerPos.y, edge);
          animations.push({
            dancerId: dancerPos.dancerId,
            startX: enterPos.x,
            startY: enterPos.y,
            endX: dancerPos.x,
            endY: dancerPos.y,
            type: 'enter',
            enterDirection: edge
          });
        }
      });

      // Start animation
      setDancerAnimations(animations);
      setIsAnimating(true);
      setPreviousFormationId(selectedFormationId);
      setSelectedFormationId(id);

      // Clear animation state after transition
      setTimeout(() => {
        setIsAnimating(false);
        setDancerAnimations([]);
      }, 1000);
    } else {
      // Not adjacent or going backwards - just switch
      setPreviousFormationId(selectedFormationId);
      setSelectedFormationId(id);
    }
  };

  const handleFormationDoubleClick = (id: string) => {
    setEditingFormationId(id);
  };

  const handleFormationNameChange = (id: string, newName: string) => {
    setFormations(formations.map(f => f.id === id ? { ...f, name: newName } : f));
  };

  const handleFormationNameBlur = () => {
    setEditingFormationId(null);
  };

  const handleAudioFileSelect = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new AudioContext();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      setAudioDuration(audioBuffer.duration);
      audioBufferRef.current = audioBuffer;
      audioCtx.close();
    } catch {
      setAudioDuration(null);
      audioBufferRef.current = null;
    }
    setAudioFile(file);
    setShowAudioUpload(false);
  };

  const stopPlayback = () => {
    playSessionRef.current += 1;
    try {
      audioSourceRef.current?.stop();
    } catch {
      // Source may already be stopped; ignore.
    }
    audioSourceRef.current = null;
    audioContextRef.current?.close();
    audioContextRef.current = null;
    cancelAnimationFrame(animFrameRef.current);
    setIsPlaying(false);
  };

  const stopRecording = () => {
    if (recordingStopRef.current) {
      recordingStopRef.current();
      recordingStopRef.current = null;
    }
  };

  const pickSupportedRecordingMimeType = () => {
    const candidates = [
      'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
      'video/mp4',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=vp9,opus',
      'video/webm'
    ];
    return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? '';
  };

  const getExtensionForMimeType = (mimeType: string) => {
    if (mimeType.includes('mp4')) return 'mp4';
    return 'webm';
  };

  const getFormationTimelineForDuration = (duration: number, containerWidth = timelineContainerWidth) => {
    if (formations.length === 0) return [];

    // Match playback timing math exactly (based on timeline viewport width).
    if (containerWidth > 40) {
      return formations.map((formation, index) => {
        const leftPx = 40 + formations.slice(0, index).reduce((sum, prev) => sum + prev.duration, 0);
        const start = ((leftPx - 40) / (containerWidth - 40)) * duration;
        const segmentDuration = (formation.duration / (containerWidth - 40)) * duration;
        const end = start + segmentDuration;
        return { formation, start, end, segmentDuration };
      });
    }

    // Fallback for initial layout before timeline width is measured.
    const totalUnits = formations.reduce((sum, f) => sum + f.duration, 0);
    const safeTotalUnits = totalUnits > 0 ? totalUnits : 1;
    let cursor = 0;
    return formations.map((formation) => {
      const start = (cursor / safeTotalUnits) * duration;
      const segmentDuration = (formation.duration / safeTotalUnits) * duration;
      const end = start + segmentDuration;
      cursor += formation.duration;
      return { formation, start, end, segmentDuration };
    });
  };

  type RenderDancer = { x: number; y: number; opacity: number };

  const getTimelineIndexAtTime = (time: number, timeline: ReturnType<typeof getFormationTimelineForDuration>) => {
    if (timeline.length === 0) return -1;
    const index = timeline.findIndex((segment, idx) => {
      if (idx === timeline.length - 1) return time >= segment.start && time <= segment.end;
      return time >= segment.start && time < segment.end;
    });
    if (index !== -1) return index;
    return time < timeline[0].start ? 0 : timeline.length - 1;
  };

  const getRenderDancersAtTime = (
    time: number,
    timeline = getFormationTimelineForDuration(timelineDuration)
  ) => {
    if (timeline.length === 0) return [];

    const safeIndex = getTimelineIndexAtTime(time, timeline);
    const current = timeline[safeIndex];
    const previous = safeIndex > 0 ? timeline[safeIndex - 1] : null;

    if (!previous || current.segmentDuration <= 0) {
      return current.formation.dancers.map((pos) => ({ dancerId: pos.dancerId, x: pos.x, y: pos.y, opacity: 1 }));
    }

    const localTime = Math.max(0, time - current.start);
    const transitionDuration = Math.min(1, current.segmentDuration);
    if (localTime >= transitionDuration) {
      return current.formation.dancers.map((pos) => ({ dancerId: pos.dancerId, x: pos.x, y: pos.y, opacity: 1 }));
    }

    const t = transitionDuration === 0 ? 1 : localTime / transitionDuration;
    const prevMap = new Map(previous.formation.dancers.map((pos) => [pos.dancerId, pos]));
    const currentMap = new Map(current.formation.dancers.map((pos) => [pos.dancerId, pos]));
    const allIds = new Set([...prevMap.keys(), ...currentMap.keys()]);

    const rendered: Array<{ dancerId: string } & RenderDancer> = [];
    allIds.forEach((dancerId) => {
      const prevPos = prevMap.get(dancerId);
      const currentPos = currentMap.get(dancerId);

      if (prevPos && currentPos) {
        rendered.push({
          dancerId,
          x: prevPos.x + (currentPos.x - prevPos.x) * t,
          y: prevPos.y + (currentPos.y - prevPos.y) * t,
          opacity: 1
        });
        return;
      }

      if (prevPos && !currentPos) {
        const edge = getNearestEdge(prevPos.x, prevPos.y);
        const exitPos = getExitPosition(prevPos.x, prevPos.y, edge);
        rendered.push({
          dancerId,
          x: prevPos.x + (exitPos.x - prevPos.x) * t,
          y: prevPos.y + (exitPos.y - prevPos.y) * t,
          opacity: 1 - t
        });
        return;
      }

      if (!prevPos && currentPos) {
        const edge = getNearestEdge(currentPos.x, currentPos.y);
        const enterPos = getEnterPosition(currentPos.x, currentPos.y, edge);
        rendered.push({
          dancerId,
          x: enterPos.x + (currentPos.x - enterPos.x) * t,
          y: enterPos.y + (currentPos.y - enterPos.y) * t,
          opacity: t
        });
      }
    });
    return rendered;
  };

  const renderStageToCanvas = (
    ctx: CanvasRenderingContext2D,
    time: number,
    timeline = getFormationTimelineForDuration(timelineDuration)
  ) => {
    const width = safeStageWidth;
    const height = safeStageHeight;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#28292a';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#8b72be';
    ctx.strokeRect(1.5, 1.5, width - 3, height - 3);

    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 1;
    for (let i = 1; i <= stageConfig.verticalGridLines; i += 1) {
      const x = (i / (stageConfig.verticalGridLines + 1)) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let i = 1; i <= stageConfig.horizontalGridLines; i += 1) {
      const y = (i / (stageConfig.horizontalGridLines + 1)) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const dancersToRender = getRenderDancersAtTime(time, timeline);
    dancersToRender.forEach(({ dancerId, x, y, opacity }) => {
      const dancer = dancers.find((d) => d.id === dancerId);
      if (!dancer) return;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

      ctx.fillStyle = dancer.color;
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '500 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getDancerInitials(dancer), x, y);

      ctx.restore();
    });
  };

  const triggerRecordingDownload = async (blob: Blob, chosenMimeType: string) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const projectSlug = projectTitle.trim().replace(/[^a-zA-Z0-9-_]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'formation-station';
    const effectiveMimeType = chosenMimeType || blob.type || 'video/webm';
    const extension = getExtensionForMimeType(effectiveMimeType);
    const filename = `${projectSlug}-${timestamp}.${extension}`;
    const videoFile = new File([blob], filename, { type: effectiveMimeType });

    const nav = navigator as Navigator & {
      canShare?: (data?: ShareData) => boolean;
      share?: (data?: ShareData) => Promise<void>;
    };

    if (nav.canShare?.({ files: [videoFile] }) && nav.share) {
      try {
        await nav.share({
          files: [videoFile],
          title: 'Formation recording'
        });
        setRecordStatus('Recording ready. Saved via share sheet.');
        return;
      } catch {
        // Fall back to direct download if share is canceled or unavailable.
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setRecordStatus(`Saved to downloads as ${filename}`);
  };

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    if (!formations.length) {
      setRecordStatus('Add at least one formation before recording.');
      return;
    }

    if (typeof MediaRecorder === 'undefined') {
      setRecordStatus('Recording is not supported in this browser.');
      return;
    }

    const wasPlayingAtStart = isPlaying;
    const livePlayheadNow = Math.max(0, Math.min(
      timelineDuration,
      playStartHeadRef.current + (performance.now() - playStartWallRef.current) / 1000
    ));
    const recordingStartTime = wasPlayingAtStart ? livePlayheadNow : 0;
    const recordingDuration = Math.max(0, timelineDuration - recordingStartTime);

    if (!wasPlayingAtStart) {
      stopPlayback();
      setPlayheadTime(0);
      playheadTimeRef.current = 0;
      if (formations[0]) {
        setPreviousFormationId(null);
        setSelectedFormationId(formations[0].id);
      }
      setIsAnimating(false);
      setDancerAnimations([]);
    }

    if (recordingDuration <= 0.01) {
      setRecordStatus('Playback is already at the end. Move playhead or press play first.');
      return;
    }

    setRecordStatus('Recording...');

    const canvas = recordingCanvasRef.current;
    if (!canvas) {
      setRecordStatus('Recording canvas is not ready yet. Try again.');
      return;
    }
    canvas.width = safeStageWidth;
    canvas.height = safeStageHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setRecordStatus('Could not initialize recording canvas.');
      return;
    }

    const recordingTimeline = getFormationTimelineForDuration(timelineDuration, timelineContainerWidth);
    renderStageToCanvas(ctx, recordingStartTime, recordingTimeline);

    const canvasStream = canvas.captureStream(30);
    const canvasVideoTrack = canvasStream.getVideoTracks()[0] as MediaStreamTrack & {
      requestFrame?: () => void;
      contentHint?: string;
    };
    if (canvasVideoTrack && 'contentHint' in canvasVideoTrack) {
      canvasVideoTrack.contentHint = 'motion';
    }
    const mixedStream = new MediaStream(canvasStream.getVideoTracks());

    let recorderAudioCtx: AudioContext | null = null;
    let recorderAudioSource: AudioBufferSourceNode | null = null;
    if (audioBufferRef.current) {
      recorderAudioCtx = new AudioContext();
      const destination = recorderAudioCtx.createMediaStreamDestination();
      recorderAudioSource = recorderAudioCtx.createBufferSource();
      recorderAudioSource.buffer = audioBufferRef.current;
      recorderAudioSource.connect(destination);
      recorderAudioSource.connect(recorderAudioCtx.destination);
      recorderAudioSource.start(0, recordingStartTime);
      destination.stream.getAudioTracks().forEach((track) => mixedStream.addTrack(track));
    }

    const mimeType = pickSupportedRecordingMimeType();
    if (!mimeType.startsWith('video/mp4')) {
      setRecordStatus('Recording... (MP4 not supported in this browser, exporting WebM)');
    }
    const chunks: BlobPart[] = [];
    let finalized = false;
    const recorder = new MediaRecorder(
      mixedStream,
      mimeType
        ? { mimeType, videoBitsPerSecond: 4_000_000 }
        : { videoBitsPerSecond: 4_000_000 }
    );

    const cleanup = async () => {
      cancelAnimationFrame(recordingFrameRef.current);
      if (recordingIntervalRef.current != null) {
        window.clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
      try {
        recorderAudioSource?.stop();
      } catch {
        // Source may already be stopped; ignore.
      }
      recorderAudioSource = null;
      mixedStream.getTracks().forEach((track) => track.stop());
      if (recorderAudioCtx) {
        await recorderAudioCtx.close();
        recorderAudioCtx = null;
      }
      recordingStopRef.current = null;
      setIsRecording(false);
      if (!wasPlayingAtStart) {
        setPlayheadTime(0);
        checkFormationRef.current(0);
      }
    };

    recordingStopRef.current = () => {
      cancelAnimationFrame(recordingFrameRef.current);
      if (recordingIntervalRef.current != null) {
        window.clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
      if (recorder.state !== 'inactive') recorder.stop();
    };

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    recorder.onerror = async () => {
      if (finalized) return;
      finalized = true;
      setRecordStatus('Recording failed. Please try again.');
      await cleanup();
    };

    recorder.onstop = async () => {
      if (finalized) return;
      finalized = true;
      const recordingBlob = new Blob(chunks, { type: mimeType || 'video/webm' });
      await cleanup();
      await triggerRecordingDownload(recordingBlob, mimeType || recordingBlob.type);
    };

    recorder.start(250);
    setIsRecording(true);

    const recordingStart = performance.now();
    let frameCounter = 0;
    const step = () => {
      if (recorder.state === 'inactive') return;
      const elapsed = (performance.now() - recordingStart) / 1000;
      const absoluteTime = Math.min(recordingStartTime + elapsed, timelineDuration);
      const timelineIndex = getTimelineIndexAtTime(absoluteTime, recordingTimeline);
      renderStageToCanvas(ctx, absoluteTime, recordingTimeline);
      // Force a per-frame bitmap difference so Chrome encoder does not collapse updates.
      frameCounter += 1;
      ctx.fillStyle = `rgb(${frameCounter % 255},0,0)`;
      ctx.fillRect(0, 0, 1, 1);
      canvasVideoTrack.requestFrame?.();
      if (!wasPlayingAtStart) {
        if (timelineIndex !== -1) {
          const visibleFormationId = recordingTimeline[timelineIndex].formation.id;
          setSelectedFormationId((currentId) => currentId === visibleFormationId ? currentId : visibleFormationId);
        }
        setPlayheadTime(absoluteTime);
      }

      if (absoluteTime >= timelineDuration && recorder.state !== 'inactive') {
        recorder.stop();
      }
    };
    const frameMs = 1000 / 30;
    canvasVideoTrack.requestFrame?.();
    step();
    recordingIntervalRef.current = window.setInterval(step, frameMs);
  };

  const handlePlayPause = () => {
    if (isRecording) return;

    if (isPlaying) {
      stopPlayback();
      return;
    }

    const startFrom = playheadTime >= timelineDuration ? 0 : playheadTime;
    if (startFrom === 0) setPlayheadTime(0);

    // Start audio if a buffer is loaded
    if (audioBufferRef.current) {
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      const source = ctx.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(ctx.destination);
      source.start(0, startFrom);
      audioSourceRef.current = source;
      source.onended = () => {
        cancelAnimationFrame(animFrameRef.current);
        setIsPlaying(false);
        setPlayheadTime(0);
      };
    }

    playStartWallRef.current = performance.now();
    playStartHeadRef.current = startFrom;
    const playSessionId = playSessionRef.current + 1;
    playSessionRef.current = playSessionId;
    setIsPlaying(true);

    const tick = () => {
      if (playSessionRef.current !== playSessionId) return;
      const elapsed = (performance.now() - playStartWallRef.current) / 1000;
      const newTime = playStartHeadRef.current + elapsed;
      setPlayheadTime(newTime);
      checkFormationRef.current(newTime);
      if (newTime < timelineDuration) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(animFrameRef.current);
        setIsPlaying(false);
        setPlayheadTime(0);
      }
    };
    animFrameRef.current = requestAnimationFrame(tick);
  };

  const handlePlayheadMouseDown = (e: React.MouseEvent) => {
    if (isRecording) return;
    e.stopPropagation();
    wasPlayingOnDragRef.current = isPlaying;
    if (isPlaying) {
      // Pause RAF + audio but keep isPlaying true so we can resume
      audioSourceRef.current?.stop();
      audioSourceRef.current = null;
      audioContextRef.current?.close();
      audioContextRef.current = null;
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsDraggingPlayhead(true);
  };

  const scrubToTime = (clientX: number) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const newTime = Math.max(0, Math.min(timelineDuration,
      ((clientX - rect.left - 40) / (timelineContainerWidth - 40)) * timelineDuration
    ));
    setPlayheadTime(newTime);
    playheadTimeRef.current = newTime;
    checkFormationRef.current(newTime);
  };

  useEffect(() => {
    if (!isDraggingPlayhead) return;

    const onMouseMove = (e: MouseEvent) => scrubToTime(e.clientX);

    const onMouseUp = () => {
      setIsDraggingPlayhead(false);
      if (wasPlayingOnDragRef.current) {
        // Restart playback from new position
        const resumeFrom = playheadTimeRef.current;
        if (audioBufferRef.current) {
          const ctx = new AudioContext();
          audioContextRef.current = ctx;
          const source = ctx.createBufferSource();
          source.buffer = audioBufferRef.current;
          source.connect(ctx.destination);
          source.start(0, resumeFrom);
          audioSourceRef.current = source;
          source.onended = () => {
            cancelAnimationFrame(animFrameRef.current);
            setIsPlaying(false);
            setPlayheadTime(0);
          };
        }
        playStartWallRef.current = performance.now();
        playStartHeadRef.current = resumeFrom;
        const playSessionId = playSessionRef.current + 1;
        playSessionRef.current = playSessionId;

        const tick = () => {
          if (playSessionRef.current !== playSessionId) return;
          const elapsed = (performance.now() - playStartWallRef.current) / 1000;
          const newTime = playStartHeadRef.current + elapsed;
          setPlayheadTime(newTime);
          checkFormationRef.current(newTime);
          if (newTime < timelineDuration) {
            animFrameRef.current = requestAnimationFrame(tick);
          } else {
            cancelAnimationFrame(animFrameRef.current);
            setIsPlaying(false);
            setPlayheadTime(0);
          }
        };
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDraggingPlayhead, timelineDuration, timelineContainerWidth]);

  const executeDeleteFormation = (formationId: string) => {
    const newFormations = formations.filter((f) => f.id !== formationId);
    if (newFormations.length === formations.length) {
      setContextMenu(null);
      setFormationDeleteDialog(null);
      return;
    }
    pushUndoSnapshot();
    setFormations(newFormations);
    setSelectedFormationId((currentSelectedId) => {
      if (currentSelectedId && newFormations.some((f) => f.id === currentSelectedId)) {
        return currentSelectedId;
      }
      return newFormations.length > 0 ? newFormations[0].id : null;
    });
    setContextMenu(null);
    setFormationDeleteDialog(null);
  };

  const openFormationDeleteDialog = (formationId: string) => {
    const formation = formations.find((f) => f.id === formationId);
    if (!formation) return;
    setFormationDeleteDialog({
      formationId: formation.id,
      formationName: formation.name
    });
    setContextMenu(null);
  };

  const handleFormationContextMenu = (e: React.MouseEvent, formationId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      formationId
    });
  };

  const handleNotesDoubleClick = () => {
    setEditingNotes(true);
  };

  const handleNotesChange = (newNotes: string) => {
    if (selectedFormationId) {
      setFormations(formations.map(f => f.id === selectedFormationId ? { ...f, notes: newNotes } : f));
    }
  };

  const handleNotesBlur = () => {
    setEditingNotes(false);
  };

  const setFormationDurationById = (formationId: string, nextDuration: number) => {
    const clampedDuration = Math.max(50, Math.round(nextDuration));
    setFormations(formations.map((f) =>
      f.id === formationId ? { ...f, duration: clampedDuration } : f
    ));
  };

  const adjustSelectedFormationDuration = (delta: number) => {
    if (!selectedFormationId) return;
    const current = formations.find((f) => f.id === selectedFormationId);
    if (!current) return;
    pushUndoSnapshot();
    setFormationDurationById(selectedFormationId, current.duration + delta);
  };

  const handleResizeStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const formation = formations.find(f => f.id === id);
    if (formation) {
      pushUndoSnapshot();
      setDraggedFormation({
        id,
        startX: e.clientX,
        startDuration: formation.duration
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggedFormation) return;
    const deltaX = e.clientX - draggedFormation.startX;
    const newDuration = Math.max(50, draggedFormation.startDuration + deltaX);
    setFormations(formations.map(f =>
      f.id === draggedFormation.id ? { ...f, duration: newDuration } : f
    ));
  };

  const handleMouseUp = () => {
    setDraggedFormation(null);
  };

  // Timeline resize listeners
  useEffect(() => {
    if (draggedFormation) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedFormation]);

  // Dancer drag listeners
  useEffect(() => {
    if (draggedDancer) {
      window.addEventListener('mousemove', handleDancerDragMove);
      window.addEventListener('mouseup', handleDancerDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDancerDragMove);
        window.removeEventListener('mouseup', handleDancerDragEnd);
      };
    }
  }, [draggedDancer, selectedFormationId, formations]);

  // Close people dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (peopleDropdownRef.current && !peopleDropdownRef.current.contains(e.target as Node)) {
        setShowPeopleDropdown(false);
      }
    };
    
    if (showPeopleDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPeopleDropdown]);

  // Close context menu when clicking anywhere
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [contextMenu]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
        setSearchQuery('');
      }
    };

    if (showSearchDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSearchDropdown]);

  // Keyboard shortcuts: delete selected formation + undo.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingTarget = !!target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      );

      if (e.key === 'Escape') {
        if (showSettingsDialog) {
          setShowSettingsDialog(false);
          return;
        }
        if (showHelpDialog) {
          setShowHelpDialog(false);
          return;
        }
      }

      if (showHelpDialog || showSettingsDialog) return;

      if (!isTypingTarget && e.key === 'Delete' && selectedFormationId && !formationDeleteDialog) {
        e.preventDefault();
        openFormationDeleteDialog(selectedFormationId);
        return;
      }

      const isUndo = (e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'z';
      if (!isTypingTarget && isUndo && undoStackRef.current.length > 0) {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFormationId, formationDeleteDialog, showHelpDialog, showSettingsDialog]);

  // Keep playheadTimeRef in sync for drag handlers
  useEffect(() => { playheadTimeRef.current = playheadTime; }, [playheadTime]);

  // Global cleanup for media resources
  useEffect(() => {
    return () => {
      stopPlayback();
      stopRecording();
    };
  }, []);

  // Keep formation-check logic fresh for the RAF callback
  useEffect(() => {
    checkFormationRef.current = (time: number) => {
      if (formations.length === 0) return;
      const timeline = getFormationTimelineForDuration(timelineDuration);
      const newIndex = getTimelineIndexAtTime(time, timeline);
      if (newIndex !== -1 && timeline[newIndex].formation.id !== selectedFormationId) {
        handleFormationClick(timeline[newIndex].formation.id);
      }
    };
  }, [formations, timelineContainerWidth, timelineDuration, selectedFormationId]);

  // Track timeline container width
  useEffect(() => {
    if (!timelineRef.current) return;
    const observer = new ResizeObserver(entries => {
      setTimelineContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, [showHomeScreen]);

  if (showHomeScreen) {
    return <HomeScreen onOpenProject={() => setShowHomeScreen(false)} />;
  }

  return (
    <div className="size-full flex flex-col bg-[#1d1d1d] overflow-hidden">
      {/* Top Purple Bar */}
      <div className="h-[67px] bg-[#8b72be] flex items-center justify-center px-6 relative">
        <button className="absolute left-6 text-white hover:opacity-80 transition-opacity" onClick={() => setShowHomeScreen(true)}>
          <Home size={24} />
        </button>
        {editingProjectTitle ? (
          <input
            autoFocus
            type="text"
            className="bg-transparent text-white text-[24px] text-center outline-none border-b-2 border-white/50 focus:border-white"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            onBlur={() => setEditingProjectTitle(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setEditingProjectTitle(false);
            }}
          />
        ) : (
          <h1 
            className="text-white text-[24px] font-normal cursor-pointer hover:opacity-80 transition-opacity"
            onDoubleClick={() => setEditingProjectTitle(true)}
          >
            {projectTitle}
          </h1>
        )}
        <div className="absolute right-6 flex items-center gap-2">
          <button
            className="text-white hover:opacity-80 transition-opacity bg-[#6f58a0] border border-white/25 rounded-[9px] p-2"
            onClick={openSettingsDialog}
            title="Open stage settings"
          >
            <Settings size={16} />
          </button>
          <button
            className="text-white hover:opacity-80 transition-opacity bg-[#6f58a0] border border-white/25 rounded-[9px] px-3 py-1.5 text-[13px] font-semibold tracking-wide"
            onClick={() => setShowHelpDialog(true)}
            title="Open help"
          >
            Help
          </button>
        </div>
      </div>

      {/* Secondary Bar with Controls */}
      <div className="h-[56px] border-b border-[#252525] flex items-center justify-between px-4">
        {/* Left: Icon Buttons */}
        <div className="flex gap-2">
          <button
            className={`w-[44px] h-[40px] rounded-[10px] border flex items-center justify-center transition-colors ${
              undoDepth > 0
                ? 'bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#333]'
                : 'bg-[#232323] border-[#2f2f2f] opacity-50 cursor-not-allowed'
            }`}
            onClick={handleUndo}
            disabled={undoDepth === 0}
            title="Undo (Ctrl/Cmd+Z)"
          >
            <Undo2 size={16} className="text-[#888888]" />
          </button>
          <div className="relative">
            <button 
              className="w-[44px] h-[40px] bg-[#2a2a2a] rounded-[10px] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333] transition-colors"
              onClick={() => setShowSearchDropdown(!showSearchDropdown)}
            >
              <Search size={17} className="text-[#888888]" />
            </button>
            
            {/* Search Dropdown */}
            {showSearchDropdown && (
              <div 
                ref={searchDropdownRef}
                className="absolute top-[calc(100%+4px)] left-0 bg-[#252525] border border-[#333] rounded-[7px] shadow-lg z-50 w-[280px]"
              >
                <div className="p-3 border-b border-[#333]">
                  <input
                    type="text"
                    className="w-full bg-transparent text-white text-[14px] px-3 py-2 rounded-[5px] outline-none border border-white/50 focus:border-white placeholder:text-white/20"
                    placeholder="search for number of dancers!"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="p-3 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                  {uniqueDancerCounts.length === 0 ? (
                    <div className="px-3 py-2 text-[#666] text-[14px]">No formations yet</div>
                  ) : (
                    uniqueDancerCounts
                      .filter(count => count.toString().includes(searchQuery))
                      .map(count => (
                        <div
                          key={count}
                          className="bg-[#2e2e2e] border border-[#3a3a3a] rounded-[8px] px-3 py-2.5 hover:bg-[#333] transition-colors cursor-pointer"
                        >
                          <p className="text-[#ccc] text-[14px]">{count} {count === 1 ? 'Dancer' : 'Dancers'}</p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            className={`w-[44px] h-[40px] rounded-[10px] border flex items-center justify-center transition-colors ${
              isRecording
                ? 'bg-[#4a2222] border-[#e03535] hover:bg-[#5a2a2a]'
                : 'bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#333]'
            }`}
            onClick={handleRecord}
            title={isRecording ? 'Stop recording' : 'Record formation video'}
          >
            {isRecording
              ? <Square size={14} className="text-[#e03535]" fill="#e03535" />
              : <div className="w-[14px] h-[14px] bg-[#e03535] rounded-[7px]" />
            }
          </button>
          <button
            className="w-[44px] h-[40px] bg-[#2a2a2a] rounded-[10px] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333] transition-colors"
            onClick={handlePlayPause}
          >
            {isPlaying
              ? <Pause size={17} className="text-[#888888]" fill="#888888" />
              : <Play size={17} className="text-[#888888]" fill="#888888" />
            }
          </button>
          <div className="relative">
            <button 
              className="w-[44px] h-[40px] bg-[#2a2a2a] rounded-[10px] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333] transition-colors"
              onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
            >
              <User size={17} className="text-[#888888]" />
            </button>
            
            {/* People Dropdown */}
            {showPeopleDropdown && (
              <div 
                ref={peopleDropdownRef}
                className="absolute top-[calc(100%+4px)] left-0 bg-[#2a2a2a] border border-[#3a3a3a] rounded-[8px] shadow-lg z-50 min-w-[260px]"
              >
                <div className="p-2">
                  {dancers.length === 0 ? (
                    <div className="px-3 py-2 text-[#666] text-[13px]">No dancers yet</div>
                  ) : (
                    dancers.map(dancer => (
                      <div key={dancer.id} className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#333] rounded">
                        <label className="relative w-5 h-5 rounded-full border border-[#555] overflow-hidden cursor-pointer">
                          <input
                            type="color"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            value={dancer.color}
                            onChange={(e) => handleDancerColorChange(dancer.id, e.target.value)}
                            title={`Set ${dancer.name} color`}
                          />
                          <span
                            className="absolute inset-0"
                            style={{ backgroundColor: dancer.color }}
                          />
                        </label>
                        <input
                          type="text"
                          className="flex-1 bg-[#1d1d1d] text-white text-[13px] px-2 py-1 rounded outline-none border border-[#3a3a3a] focus:border-[#8b72be]"
                          value={dancer.name}
                          onChange={(e) => handleDancerNameChange(dancer.id, e.target.value)}
                          placeholder="Dancer name"
                        />
                        <button
                          className="w-5 h-5 flex items-center justify-center hover:bg-[#444] rounded transition-colors"
                          onClick={() => handleDancerClickInDropdown(dancer.id)}
                          title="Add dancer to selected formation"
                        >
                          <Plus size={12} className="text-[#8b72be]" />
                        </button>
                        <button
                          className="w-5 h-5 flex items-center justify-center hover:bg-[#444] rounded transition-colors"
                          onClick={() => setRemovalDialog({ dancerId: dancer.id, dancerName: dancer.name })}
                        >
                          <Minus size={12} className="text-[#888]" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Path Edit Mode Toggle */}
        <div className="flex items-center gap-2">
          {selectedFormation && (
            <div className="flex items-center gap-1 mr-1">
              <span className="text-[#999] text-[12px] uppercase tracking-wide">length</span>
              <button
                className="w-5 h-5 rounded border border-[#444] text-[#999] hover:bg-[#333] transition-colors flex items-center justify-center"
                onClick={() => adjustSelectedFormationDuration(-20)}
                title="Shorten selected formation"
              >
                <Minus size={10} />
              </button>
              <span className="text-[#b4b1b1] text-[12px] w-[34px] text-center">{Math.round(selectedFormation.duration)}</span>
              <button
                className="w-5 h-5 rounded border border-[#444] text-[#999] hover:bg-[#333] transition-colors flex items-center justify-center"
                onClick={() => adjustSelectedFormationDuration(20)}
                title="Lengthen selected formation"
              >
                <Plus size={10} />
              </button>
            </div>
          )}
          {recordStatus && (
            <span className={`text-[12px] max-w-[300px] truncate ${isRecording ? 'text-[#e03535]' : 'text-[#999]'}`}>
              {recordStatus}
            </span>
          )}
          <span className="text-[#999] text-[13px] font-medium">path edit mode</span>
          <button
            onClick={() => setIsPathEditMode(!isPathEditMode)}
            className={`w-[46px] h-[26px] rounded-[13px] relative transition-colors ${
              isPathEditMode ? 'bg-[#8b72be]' : 'bg-[#3a3a3a]'
            }`}
          >
            <div
              className={`absolute top-[3px] w-[20px] h-[20px] bg-white rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.4)] transition-all ${
                isPathEditMode ? 'left-[23px]' : 'left-[3px]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Panel (Formations List) */}
        <div
          className={`absolute left-0 top-0 bottom-[150px] bg-[#252525] rounded-r-[7px] border-r border-[#333] transition-transform duration-300 z-10 ${
            isPanelOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '280px' }}
        >
          <div className="h-[56px] border-b border-[#333] px-4 flex items-center">
            <h2 className="text-[#aaa] text-[13px] font-semibold tracking-[0.52px] uppercase">FORMATIONS OVERVIEW</h2>
          </div>
          <div className="p-3 flex flex-col gap-3">
            {formations.map((formation) => (
              <div
                key={formation.id}
                className={`bg-[#2e2e2e] border rounded-[8px] p-3 cursor-pointer hover:bg-[#333] transition-colors ${
                  selectedFormationId === formation.id ? 'border-[#8b72be]' : 'border-[#3a3a3a]'
                }`}
                onClick={() => handleFormationClick(formation.id)}
                onContextMenu={(e) => handleFormationContextMenu(e, formation.id)}
              >
                <div className="text-[#ccc] text-[12px] mb-2">{formation.name}</div>
                {/* Mini preview */}
                <div className="relative bg-[#1d1d1d] rounded border border-[#3a3a3a] h-[80px]">
                  {formation.dancers.map(dancerPos => {
                    const dancer = dancers.find(d => d.id === dancerPos.dancerId);
                    if (!dancer) return null;
                    return (
                      <div
                        key={dancerPos.dancerId}
                        className="absolute w-[18px] h-[18px] rounded-full flex items-center justify-center text-white text-[8px] font-medium"
                        style={{
                          left: `${(dancerPos.x / safeStageWidth) * 100}%`,
                          top: `${(dancerPos.y / safeStageHeight) * 100}%`,
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: dancer.color
                        }}
                      >
                        {getDancerInitials(dancer)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Toggle Button */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={`absolute top-1/2 -translate-y-1/2 z-20 w-[22px] h-[64px] bg-[#2e2e2e] border border-[#3a3a3a] border-l-0 rounded-r-[8px] flex items-center justify-center hover:bg-[#333] transition-all shadow-[2px_0px_8px_0px_rgba(0,0,0,0.4)] ${
            isPanelOpen ? 'left-[280px]' : 'left-0'
          }`}
        >
          <ChevronRight
            size={13}
            className={`text-[#666] transition-transform ${isPanelOpen ? '' : 'rotate-180'}`}
          />
        </button>

        {/* Stage Area */}
        {formations.length > 0 && selectedFormation && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
            {/* Formation Name Above Stage */}
            <div>
              <span className="text-[#b4b1b1] text-[20px] font-bold tracking-[0.52px]">{selectedFormation.name}</span>
            </div>

            {/* Stage with Notes */}
            <div className="flex gap-6 items-start">
              <div 
                ref={stageRef}
                className="bg-[#28292a] rounded-[16px] border-[3px] border-[#8b72be] relative overflow-hidden cursor-crosshair" 
                style={{ width: `${safeStageWidth}px`, height: `${safeStageHeight}px` }}
                onClick={handleStageClick}
              >
                {/* Vertical gridlines */}
                {Array.from({ length: stageConfig.verticalGridLines }, (_, idx) => idx + 1).map((line) => (
                  <div
                    key={`v-${line}`}
                    className="absolute top-0 bottom-0 w-px bg-[#3a3a3a] pointer-events-none"
                    style={{ left: `${(line / (stageConfig.verticalGridLines + 1)) * 100}%` }}
                  />
                ))}
                {/* Horizontal gridlines */}
                {Array.from({ length: stageConfig.horizontalGridLines }, (_, idx) => idx + 1).map((line) => (
                  <div
                    key={`h-${line}`}
                    className="absolute left-0 right-0 h-px bg-[#3a3a3a] pointer-events-none"
                    style={{ top: `${(line / (stageConfig.horizontalGridLines + 1)) * 100}%` }}
                  />
                ))}
                
                {/* Dancers */}
                {selectedFormation.dancers.map(dancerPos => {
                  const dancer = dancers.find(d => d.id === dancerPos.dancerId);
                  if (!dancer) return null;
                  const isSelected = selectedDancerIds.has(dancer.id);
                  
                  // Check if this dancer has an animation
                  const animation = dancerAnimations.find(a => a.dancerId === dancerPos.dancerId);
                  
                  if (animation && isAnimating) {
                    // During animation, use animation positions
                    return (
                      <div
                        key={dancerPos.dancerId}
                        className={`dancer-circle absolute w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-[18px] font-medium cursor-move select-none transition-all duration-1000 ease-in-out ${
                          isSelected ? 'ring-4 ring-white' : ''
                        }`}
                        style={{
                          left: `${animation.endX}px`,
                          top: `${animation.endY}px`,
                          transform: 'translate(-50%, -50%)',
                          opacity: animation.type === 'exit' ? 0 : 1,
                          backgroundColor: dancer.color
                        }}
                        onClick={(e) => handleDancerClick(e, dancer.id)}
                        onMouseDown={(e) => handleDancerDragStart(e, dancer.id, dancerPos.x, dancerPos.y)}
                      >
                        {getDancerInitials(dancer)}
                      </div>
                    );
                  }
                  
                  return (
                    <div
                      key={dancerPos.dancerId}
                      className={`dancer-circle absolute w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-[18px] font-medium cursor-move select-none ${
                        isSelected ? 'ring-4 ring-white' : ''
                      }`}
                      style={{
                        left: `${dancerPos.x}px`,
                        top: `${dancerPos.y}px`,
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: dancer.color
                      }}
                      onClick={(e) => handleDancerClick(e, dancer.id)}
                      onMouseDown={(e) => handleDancerDragStart(e, dancer.id, dancerPos.x, dancerPos.y)}
                    >
                      {getDancerInitials(dancer)}
                    </div>
                  );
                })}
                
                {/* Render entering dancers during animation */}
                {isAnimating && dancerAnimations.filter(a => a.type === 'enter').map(animation => {
                  const dancer = dancers.find(d => d.id === animation.dancerId);
                  if (!dancer) return null;
                  
                  return (
                    <div
                      key={animation.dancerId}
                      className="absolute w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-[18px] font-medium transition-all duration-1000 ease-in-out"
                      style={{
                        left: `${animation.endX}px`,
                        top: `${animation.endY}px`,
                        transform: 'translate(-50%, -50%)',
                        opacity: 1,
                        backgroundColor: dancer.color
                      }}
                    >
                      {getDancerInitials(dancer)}
                    </div>
                  );
                })}
              </div>

              {/* Notes Box */}
              <div 
                className="bg-[#28292a] rounded-[16px] w-[250px] p-4 cursor-text"
                style={{ height: `${safeStageHeight}px` }}
                onDoubleClick={handleNotesDoubleClick}
              >
                <h3 className="text-[#b4b1b1] text-[20px] font-bold tracking-[0.52px] mb-4">Notes</h3>
                {editingNotes ? (
                  <textarea
                    autoFocus
                    className="w-full h-[calc(100%-40px)] bg-transparent text-[#b4b1b1] text-[18px] leading-[19.5px] tracking-[0.52px] resize-none outline-none"
                    value={selectedFormation.notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    onBlur={handleNotesBlur}
                  />
                ) : (
                  <p className="text-[#b4b1b1] text-[18px] leading-[19.5px] tracking-[0.52px] whitespace-pre-wrap">
                    {selectedFormation.notes || ''}
                  </p>
                )}
              </div>
            </div>

            <div>
              <span className="text-[#8b8b8b] text-[24px] tracking-wider">AUDIENCE</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Timeline */}
      <div className="h-[150px] border-t border-white flex">
        {/* Labels Column */}
        <div className="w-[120px] flex flex-col border-r border-white">
          <div className="h-1/2 flex items-center justify-center border-b border-white">
            <span className="text-[#8b8b8b] text-[20px]">Formation</span>
          </div>
          <div className="h-1/2 flex items-center justify-center">
            <span className="text-[#8b8b8b] text-[20px]">Audio</span>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 relative" ref={timelineRef}>
          {/* Playhead */}
          {timelineContainerWidth > 0 && (
            <div
              className="absolute top-0 bottom-0 z-20 flex flex-col items-center"
              style={{ left: `${40 + (playheadTime / timelineDuration) * (timelineContainerWidth - 40)}px`, transform: 'translateX(-50%)' }}
            >
              {/* Drag handle knob */}
              <div
                className="w-3 h-3 bg-[#e03535] rounded-full flex-shrink-0 cursor-ew-resize"
                onMouseDown={handlePlayheadMouseDown}
              />
              {/* Line */}
              <div className="w-[2px] flex-1 bg-[#e03535] cursor-ew-resize" onMouseDown={handlePlayheadMouseDown} />
            </div>
          )}

          {/* Time markers */}
          <div className="absolute top-0 left-0 right-0 h-full pointer-events-none">
            {timeMarkers.map((t) => (
              <div
                key={t}
                className="absolute top-0 bottom-0"
                style={{ left: `${40 + (t / timelineDuration) * (timelineContainerWidth - 40)}px` }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-2 top-2">
                  <span className="text-[#b4b1b1] text-[15px]">{formatTime(t)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Formation Track */}
          <div className="absolute left-0 top-0 right-0 h-1/2 border-b border-white">
            {/* Plus button */}
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#2a2a2a] border border-[#3a3a3a] rounded flex items-center justify-center hover:bg-[#333] transition-colors z-10"
              onClick={createNewFormation}
            >
              <Plus size={16} className="text-[#888]" />
            </button>

            {/* Formation Blocks */}
            {formations.map((formation, index) => (
              <div
                key={formation.id}
                className={`absolute top-1/2 -translate-y-1/2 h-[39px] bg-[rgba(139,114,190,0.2)] border border-[#8b72be] rounded-[5px] flex items-center justify-center cursor-pointer ${
                  selectedFormationId === formation.id ? 'ring-2 ring-[#8b72be]' : ''
                }`}
                style={{
                  left: `${40 + formations.slice(0, index).reduce((s, p) => s + p.duration, 0)}px`,
                  width: `${formation.duration}px`
                }}
                onClick={() => handleFormationClick(formation.id)}
                onDoubleClick={() => handleFormationDoubleClick(formation.id)}
                onContextMenu={(e) => handleFormationContextMenu(e, formation.id)}
              >
                {editingFormationId === formation.id ? (
                  <input
                    autoFocus
                    type="text"
                    className="bg-transparent text-white text-[13px] text-center w-full outline-none"
                    value={formation.name}
                    onChange={(e) => handleFormationNameChange(formation.id, e.target.value)}
                    onBlur={handleFormationNameBlur}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleFormationNameBlur();
                    }}
                  />
                ) : (
                  <span className="text-white text-[13px]">{formation.name}</span>
                )}
                
                {/* Resize handle */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-[#8b72be] transition-colors"
                  onMouseDown={(e) => handleResizeStart(e, formation.id)}
                />
              </div>
            ))}
          </div>

          {/* Audio Track */}
          <div className="absolute left-0 bottom-0 right-0 h-1/2">
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#2a2a2a] border border-[#3a3a3a] rounded flex items-center justify-center hover:bg-[#333] transition-colors"
              onClick={() => setShowAudioUpload(true)}
            >
              <Plus size={16} className="text-[#888]" />
            </button>
            {audioFile && timelineContainerWidth > 0 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 h-[39px] bg-[rgba(139,114,190,0.2)] border border-[#8b72be] rounded-[5px] flex items-center px-3 gap-2 overflow-hidden"
                style={{ left: 40, width: timelineContainerWidth - 40 }}
              >
                <span className="text-white text-[13px] truncate flex-1">{audioFile.name}</span>
                {audioDuration != null && (
                  <span className="text-[#8b72be] text-[12px] flex-shrink-0">{formatTime(audioDuration)}</span>
                )}
                <button
                  className="text-[#888] hover:text-white transition-colors flex-shrink-0"
                  onClick={() => { stopPlayback(); setPlayheadTime(0); setAudioFile(null); setAudioDuration(null); audioBufferRef.current = null; }}
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      {showSettingsDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowSettingsDialog(false)}>
          <div
            className="bg-[#252525] border border-[#3a3a3a] rounded-[12px] w-[min(640px,calc(100%-32px))] max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3a3a3a]">
              <h3 className="text-white text-[18px] font-semibold">Stage Settings</h3>
              <button
                onClick={() => setShowSettingsDialog(false)}
                className="text-[#888] hover:text-white transition-colors"
                title="Close settings"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 overflow-y-auto text-[14px] text-[#d0d0d0] space-y-5">
              <section>
                <h4 className="text-white text-[15px] font-semibold mb-3">Stage Dimensions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-[#aaa] text-[12px] uppercase tracking-wide">Width (px)</span>
                    <input
                      type="number"
                      min={STAGE_MIN_WIDTH}
                      max={STAGE_MAX_WIDTH}
                      value={Number.isFinite(settingsDraft.width) ? settingsDraft.width : stageConfig.width}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setSettingsDraft((prev) => ({ ...prev, width: Number.isFinite(next) ? next : stageConfig.width }));
                      }}
                      className="bg-[#1d1d1d] border border-[#3a3a3a] rounded-[8px] px-3 py-2 text-white outline-none focus:border-[#8b72be]"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[#aaa] text-[12px] uppercase tracking-wide">Height (px)</span>
                    <input
                      type="number"
                      min={STAGE_MIN_HEIGHT}
                      max={STAGE_MAX_HEIGHT}
                      value={Number.isFinite(settingsDraft.height) ? settingsDraft.height : stageConfig.height}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setSettingsDraft((prev) => ({ ...prev, height: Number.isFinite(next) ? next : stageConfig.height }));
                      }}
                      className="bg-[#1d1d1d] border border-[#3a3a3a] rounded-[8px] px-3 py-2 text-white outline-none focus:border-[#8b72be]"
                    />
                  </label>
                </div>
                <p className="text-[#999] text-[12px] mt-2">
                  Allowed range: {STAGE_MIN_WIDTH}-{STAGE_MAX_WIDTH}px wide, {STAGE_MIN_HEIGHT}-{STAGE_MAX_HEIGHT}px high.
                </p>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-3">Aspect Ratio</h4>
                <p className="text-[#aaa] text-[13px] mb-3">
                  Current: <span className="text-white">{stageRatioLabel}</span> ({Math.round((safeStageWidth / safeStageHeight) * 100) / 100}:1)
                  {' '}| Draft: <span className="text-white">{draftRatioLabel}</span> ({Math.round((draftStageWidth / draftStageHeight) * 100) / 100}:1)
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-3 py-1.5 rounded-[8px] bg-[#1d1d1d] border border-[#3a3a3a] hover:bg-[#333] text-white transition-colors"
                    onClick={() => applyRatioPresetToDraft(16, 9)}
                  >
                    16:9
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-[8px] bg-[#1d1d1d] border border-[#3a3a3a] hover:bg-[#333] text-white transition-colors"
                    onClick={() => applyRatioPresetToDraft(4, 3)}
                  >
                    4:3
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-[8px] bg-[#1d1d1d] border border-[#3a3a3a] hover:bg-[#333] text-white transition-colors"
                    onClick={() => applyRatioPresetToDraft(8, 5)}
                  >
                    8:5
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-[8px] bg-[#1d1d1d] border border-[#3a3a3a] hover:bg-[#333] text-white transition-colors"
                    onClick={() => applyRatioPresetToDraft(1, 1)}
                  >
                    1:1
                  </button>
                </div>
                <p className="text-[#999] text-[12px] mt-2">Ratio presets keep your draft width and recalculate draft height.</p>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-3">Grid Lines</h4>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-[#aaa] text-[12px] uppercase tracking-wide">Vertical Lines</span>
                    <input
                      type="number"
                      min={GRID_MIN_LINES}
                      max={GRID_MAX_LINES}
                      value={Number.isFinite(settingsDraft.verticalGridLines) ? settingsDraft.verticalGridLines : stageConfig.verticalGridLines}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setSettingsDraft((prev) => ({ ...prev, verticalGridLines: Number.isFinite(next) ? next : stageConfig.verticalGridLines }));
                      }}
                      className="bg-[#1d1d1d] border border-[#3a3a3a] rounded-[8px] px-3 py-2 text-white outline-none focus:border-[#8b72be]"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[#aaa] text-[12px] uppercase tracking-wide">Horizontal Lines</span>
                    <input
                      type="number"
                      min={GRID_MIN_LINES}
                      max={GRID_MAX_LINES}
                      value={Number.isFinite(settingsDraft.horizontalGridLines) ? settingsDraft.horizontalGridLines : stageConfig.horizontalGridLines}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setSettingsDraft((prev) => ({ ...prev, horizontalGridLines: Number.isFinite(next) ? next : stageConfig.horizontalGridLines }));
                      }}
                      className="bg-[#1d1d1d] border border-[#3a3a3a] rounded-[8px] px-3 py-2 text-white outline-none focus:border-[#8b72be]"
                    />
                  </label>
                </div>
              </section>
            </div>

            <div className="px-6 py-4 border-t border-[#3a3a3a] flex justify-end gap-2">
              <button
                onClick={() => setShowSettingsDialog(false)}
                className="bg-[#1d1d1d] hover:bg-[#333] text-[#aaa] px-4 py-2 rounded-[8px] text-[14px] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyStageSettings}
                className="bg-[#8b72be] hover:bg-[#7b62ae] text-white px-4 py-2 rounded-[8px] text-[14px] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Dialog */}
      {showHelpDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowHelpDialog(false)}>
          <div
            className="bg-[#252525] border border-[#3a3a3a] rounded-[12px] w-[min(940px,calc(100%-32px))] max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3a3a3a]">
              <h3 className="text-white text-[18px] font-semibold">Help & Quick Guide</h3>
              <button
                onClick={() => setShowHelpDialog(false)}
                className="text-[#888] hover:text-white transition-colors"
                title="Close help"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5 overflow-y-auto text-[14px] text-[#d0d0d0] leading-relaxed space-y-5">
              <section>
                <h4 className="text-white text-[15px] font-semibold mb-2">1) Getting started</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Click <span className="text-white font-medium">open new project</span> on the home screen.</li>
                  <li>Use the <span className="text-white font-medium">+ button on the formation track</span> to create formations.</li>
                  <li>Click a formation block to select it before editing dancers, notes, or timing.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-2">2) Working with formations</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Click a formation name to select it; double-click its name on the timeline to rename it.</li>
                  <li>Adjust formation length using the <span className="text-white font-medium">length - / +</span> controls in the top bar.</li>
                  <li>You can also drag a formation block&apos;s right edge in the timeline to resize its duration.</li>
                  <li>Use the top-right <span className="text-white font-medium">Settings</span> button to change stage size, ratio, and grid lines.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-2">3) Adding and editing dancers</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Click anywhere on the stage to add a new dancer to the selected formation.</li>
                  <li>Drag a dancer circle on the stage to reposition it.</li>
                  <li>Use the <span className="text-white font-medium">People</span> menu to change dancer names and colors.</li>
                  <li>In the People menu, <span className="text-white font-medium">+</span> adds an existing dancer to the current formation.</li>
                  <li>In the People menu, <span className="text-white font-medium">-</span> opens removal options (this formation or all formations).</li>
                </ul>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-2">4) Playback and sync</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Press <span className="text-white font-medium">Play</span> to run through formations in timeline order.</li>
                  <li>Drag the red playhead handle to scrub time manually.</li>
                  <li>Audio playback syncs to the same playhead when a .wav file is loaded.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-2">5) Audio upload</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Click the <span className="text-white font-medium">+</span> in the Audio track to upload audio.</li>
                  <li>Supported upload format is <span className="text-white font-medium">.wav</span>.</li>
                  <li>Use the small <span className="text-white font-medium">X</span> on the audio strip to remove uploaded audio.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-2">6) Recording and download</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Press <span className="text-white font-medium">Record</span> to capture the stage animation and audio.</li>
                  <li>If playback is running, recording starts from the live playhead; if not, it starts from time 0.</li>
                  <li>When recording ends, the file downloads automatically (or opens share sheet when supported).</li>
                  <li>MP4 is attempted first; if unsupported in the browser, the app exports WebM.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-2">7) Delete, remove, and undo</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Right-click a formation block (or a formation card) and choose <span className="text-white font-medium">Delete Formation</span>.</li>
                  <li>You can also select a formation and press the <span className="text-white font-medium">Delete</span> key.</li>
                  <li>Use the top-left <span className="text-white font-medium">Undo</span> button (or Ctrl/Cmd + Z) to revert the last change.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-white text-[15px] font-semibold mb-2">8) Common troubleshooting</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>If you cannot place dancers, make sure a formation is selected first.</li>
                  <li>If playback looks stuck, check timeline lengths and move the playhead away from the end.</li>
                  <li>If recording is unavailable, verify your browser supports MediaRecorder.</li>
                  <li>If you don&apos;t see the saved recording, check your browser&apos;s Downloads folder and download permissions.</li>
                </ul>
              </section>
            </div>
            <div className="px-6 py-3 border-t border-[#3a3a3a] text-[#999] text-[12px]">
              Press <span className="text-white">Esc</span> or click outside this panel to close.
            </div>
          </div>
        </div>
      )}

      {/* Removal Dialog */}
      {removalDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-[12px] p-6 min-w-[320px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-[16px] font-medium">Remove {removalDialog.dancerName} from:</h3>
              <button 
                onClick={() => setRemovalDialog(null)}
                className="text-[#888] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleRemoveDancer('all')}
                className="bg-[#1d1d1d] hover:bg-[#333] text-white px-4 py-2.5 rounded-[8px] text-[14px] transition-colors"
              >
                All formations
              </button>
              <button
                onClick={() => handleRemoveDancer('this')}
                className="bg-[#1d1d1d] hover:bg-[#333] text-white px-4 py-2.5 rounded-[8px] text-[14px] transition-colors"
                disabled={!selectedFormationId}
              >
                This formation only
              </button>
              <button
                onClick={() => handleRemoveDancer('cancel')}
                className="bg-[#1d1d1d] hover:bg-[#333] text-[#888] px-4 py-2.5 rounded-[8px] text-[14px] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formation Delete Dialog */}
      {formationDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setFormationDeleteDialog(null)}>
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-[12px] p-6 min-w-[360px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-[16px] font-medium">Delete {formationDeleteDialog.formationName}?</h3>
              <button
                onClick={() => setFormationDeleteDialog(null)}
                className="text-[#888] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-[#999] text-[13px] mb-5">
              This removes the formation block from the timeline.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setFormationDeleteDialog(null)}
                className="bg-[#1d1d1d] hover:bg-[#333] text-[#999] px-4 py-2.5 rounded-[8px] text-[14px] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => executeDeleteFormation(formationDeleteDialog.formationId)}
                className="bg-[#e03535] hover:bg-[#c92f2f] text-white px-4 py-2.5 rounded-[8px] text-[14px] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Upload Dialog */}
      {showAudioUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAudioUpload(false)}>
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-[12px] p-6 w-[380px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white text-[16px] font-medium">Upload Audio</h3>
              <button onClick={() => setShowAudioUpload(false)} className="text-[#888] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div
              className="border-2 border-dashed border-[#3a3a3a] rounded-[10px] p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-[#8b72be] transition-colors"
              onClick={() => audioInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.name.endsWith('.wav')) {
                  handleAudioFileSelect(file);
                }
              }}
            >
              <div className="w-12 h-12 bg-[#1d1d1d] rounded-full flex items-center justify-center">
                <Plus size={24} className="text-[#8b72be]" />
              </div>
              <p className="text-[#ccc] text-[14px] text-center">Click to browse or drag & drop</p>
              <p className="text-[#666] text-[12px]">.wav files only</p>
            </div>
            <input
              ref={audioInputRef}
              type="file"
              accept=".wav"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleAudioFileSelect(file);
                }
                e.target.value = '';
              }}
            />
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-[#2a2a2a] border border-[#3a3a3a] rounded-[8px] shadow-lg z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button
            className="w-full px-4 py-2 text-white hover:bg-[#333] transition-colors"
            onClick={() => openFormationDeleteDialog(contextMenu.formationId)}
          >
            Delete Formation
          </button>
        </div>
      )}

      {/* Recording Preview Canvas (Chrome capture reliability) */}
      <div
        className={`fixed right-3 bottom-3 z-50 rounded border border-[#3a3a3a] bg-[#111] overflow-hidden transition-opacity ${
          isRecording ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ width: '220px', aspectRatio: `${safeStageWidth} / ${safeStageHeight}` }}
      >
        <canvas
          ref={recordingCanvasRef}
          width={safeStageWidth}
          height={safeStageHeight}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
