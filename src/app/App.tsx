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
  path?: DancerPath;
}

type PathType = 'straight' | 'quadratic' | 'cubic' | 'l-shape';

interface PathPoint {
  x: number;
  y: number;
}

interface DancerPath {
  type: PathType;
  controlPoints: PathPoint[];
}

interface StoredDancerPath {
  type: PathType;
  controlPoints: Array<{
    xRatio: number;
    yRatio: number;
  }>;
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

interface DraggedDancerState {
  dancerIds: string[];
  anchorId: string;
  offsetX: number;
  offsetY: number;
  initialPositions: Record<string, { x: number; y: number }>;
  preserveMultiSelectionOnClick: boolean;
}

interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  additive: boolean;
}

interface ResizedFormationState {
  id: string;
  startX: number;
  startDuration: number;
}

interface ReorderedFormationState {
  id: string;
  startX: number;
  pointerOffsetX: number;
  currentX: number;
}

interface DraggedPathHandleState {
  dancerId: string;
  controlIndex: number;
}

interface Formation {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  transitionToNextSeconds?: number;
  notes: string;
  dancers: DancerPosition[];
  transitionPaths?: Record<string, DancerPath>;
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

interface LibraryFormationDancer {
  sourceDancerId: string;
  name: string;
  color: string;
  number: number;
  xRatio: number;
  yRatio: number;
}

interface LibraryFormationTemplate {
  id: string;
  projectId: string;
  projectTitle: string;
  formationId: string;
  formationName: string;
  duration: number;
  transitionToNextSeconds?: number;
  dancerCount: number;
  dancers: LibraryFormationDancer[];
  transitionPaths?: Record<string, StoredDancerPath>;
  notes?: string;
  updatedAt: number;
}

interface ProjectLibraryRecord {
  projectId: string;
  projectTitle: string;
  updatedAt: number;
  formations: LibraryFormationTemplate[];
  transitionSeconds?: number;
  audioFileName?: string;
  audioData?: string;
}

// Home Screen Component
function HomeScreen({
  projects,
  onNewProject,
  onOpenProject,
  onDeleteProject,
  onRenameProject,
}: {
  projects: ProjectLibraryRecord[];
  onNewProject: () => void;
  onOpenProject: (record: ProjectLibraryRecord) => void;
  onDeleteProject: (projectId: string) => void;
  onRenameProject: (projectId: string, newTitle: string) => void;
}) {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const startRename = (record: ProjectLibraryRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(record.projectId);
    setRenameValue(record.projectTitle);
  };

  const commitRename = () => {
    if (renamingId && renameValue.trim()) {
      onRenameProject(renamingId, renameValue.trim());
    }
    setRenamingId(null);
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="size-full flex flex-col bg-[#1d1d1d] overflow-auto">
      {/* Header */}
      <div className="flex-shrink-0 px-10 pt-14 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-10 rounded-full bg-[#8b72be]" />
          <h1 className="text-white text-[38px] font-semibold tracking-tight">Formation Station</h1>
        </div>
        <p className="text-[#8b8b8b] text-[15px] pl-5">Choreograph your vision</p>
      </div>

      {/* Divider */}
      <div className="mx-10 h-px bg-[#3a3a3a] flex-shrink-0" />

      {/* Projects Section */}
      <div className="flex-1 px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#b4b1b1] text-[11px] uppercase tracking-[2px] font-semibold">Projects</h2>
          <span className="text-[#888] text-[12px]">{projects.length} project{projects.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
          {/* New Project Card */}
          <button
            onClick={onNewProject}
            className="group bg-[#252525] border-2 border-dashed border-[#3a3a3a] hover:border-[#8b72be] hover:bg-[#2a2a2a] rounded-[12px] p-6 flex flex-col items-center justify-center gap-3 transition-all min-h-[152px] cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#2e2e2e] group-hover:bg-[#8b72be] flex items-center justify-center transition-colors">
              <Plus size={20} className="text-[#888] group-hover:text-white transition-colors" />
            </div>
            <span className="text-[#888] group-hover:text-[#b4b1b1] text-[14px] font-medium transition-colors">New Project</span>
          </button>

          {/* Existing Project Cards */}
          {projects.map((record) => (
            <div
              key={record.projectId}
              onClick={() => renamingId !== record.projectId && onOpenProject(record)}
              className="group bg-[#252525] border border-[#3a3a3a] hover:border-[#8b72be] rounded-[12px] p-5 flex flex-col gap-3 transition-all cursor-pointer min-h-[152px]"
            >
              {/* Top row: badge + actions */}
              <div className="flex items-center justify-between">
                <span className="bg-[rgba(139,114,190,0.15)] text-[#8b72be] text-[11px] px-2.5 py-1 rounded-full font-medium">
                  {record.formations.length} formation{record.formations.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => startRename(record, e)}
                    className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[#3a3a3a] transition-colors"
                    title="Rename"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(record.projectId); }}
                    className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[#3a3a3a] transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={13} className="text-[#888] hover:text-[#e03535] transition-colors" />
                  </button>
                </div>
              </div>

              {/* Title */}
              {renamingId === record.projectId ? (
                <input
                  autoFocus
                  className="bg-[#2a2a2a] border border-[#8b72be] text-white text-[15px] font-medium rounded-[6px] px-2 py-1 outline-none w-full"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={(e) => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null); }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <h3 className="text-white text-[15px] font-medium leading-snug">{record.projectTitle}</h3>
              )}

              {/* Footer */}
              <div className="mt-auto flex items-center gap-2">
                <div className="flex -space-x-1">
                  {Array.from(new Map(record.formations.flatMap(f => f.dancers).map(d => [d.sourceDancerId, d])).values()).slice(0, 5).map((d, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-[#252525] flex-shrink-0" style={{ backgroundColor: d.color }} />
                  ))}
                </div>
                <p className="text-[#888] text-[11px] ml-auto">Edited {formatDate(record.updatedAt)}</p>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-[#8b8b8b] text-[14px] mt-6">No saved projects yet. Create your first one.</p>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setDeleteConfirmId(null)}>
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-[12px] p-6 w-[320px]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white text-[16px] font-medium mb-2">Delete project?</h3>
            <p className="text-[#888] text-[14px] mb-5">This will remove the project from your list. This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded-[8px] text-[#888] hover:text-white text-[14px] transition-colors">
                Cancel
              </button>
              <button
                onClick={() => { onDeleteProject(deleteConfirmId); setDeleteConfirmId(null); }}
                className="px-4 py-2 rounded-[8px] bg-[#e03535] hover:bg-[#c92f2f] text-white text-[14px] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
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
const STAGE_DRAG_THRESHOLD = 4;
const DEFAULT_FORMATION_TRANSITION_SECONDS = 1;
const MIN_FORMATION_TRANSITION_SECONDS = 0;
const MAX_FORMATION_TRANSITION_SECONDS = 20;
const TIMELINE_BLOCK_HEIGHT = 39;
const PROJECT_LIBRARY_STORAGE_KEY = 'formation-station-project-library-v1';
const LAST_OPEN_PROJECT_KEY = 'formation-station-last-open-project';
const PROJECT_LIBRARY_MAX_PROJECTS = 30;

// Captured synchronously at module load time, before any React effects can clear it.
const INITIAL_LAST_OPEN_PROJECT_ID = (() => {
  try { return window.localStorage.getItem(LAST_OPEN_PROJECT_KEY); } catch { return null; }
})();
const FORMATION_LIBRARY_DRAG_TYPE = 'application/x-formation-library-template';
const PEOPLE_DANCER_DRAG_TYPE = 'application/x-formation-station-dancer';
const PATH_HANDLE_HIT_RADIUS = 10;

const PATH_TYPE_OPTIONS: Array<{ id: PathType; label: string; description: string }> = [
  { id: 'straight', label: 'Straight Line', description: 'Direct line from current position to next position.' },
  { id: 'quadratic', label: '3-Point Curve', description: 'One draggable control point bends the path.' },
  { id: 'cubic', label: '4-Point Curve', description: 'Two draggable control points create a more complex curve.' },
  { id: 'l-shape', label: 'L-Shape', description: 'A sharp corner path with one draggable elbow.' }
];

const createProjectId = () => `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const readProjectLibraryFromStorage = (): ProjectLibraryRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PROJECT_LIBRARY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ProjectLibraryRecord[];
  } catch {
    return [];
  }
};

export default function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPathEditMode, setIsPathEditMode] = useState(false);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedFormationId, setSelectedFormationId] = useState<string | null>(null);
  const [previousFormationId, setPreviousFormationId] = useState<string | null>(null);
  const [dancerAnimations, setDancerAnimations] = useState<DancerAnimation[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualTransitionProgress, setManualTransitionProgress] = useState(0);
  const [editingFormationId, setEditingFormationId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [resizedFormation, setResizedFormation] = useState<ResizedFormationState | null>(null);
  const [reorderedFormation, setReorderedFormation] = useState<ReorderedFormationState | null>(null);
  
  const [dancers, setDancers] = useState<Dancer[]>([]);
  const [selectedDancerIds, setSelectedDancerIds] = useState<Set<string>>(new Set());
  const [draggedDancer, setDraggedDancer] = useState<DraggedDancerState | null>(null);
  const [draggedPathHandle, setDraggedPathHandle] = useState<DraggedPathHandleState | null>(null);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [draggedPeopleDancerId, setDraggedPeopleDancerId] = useState<string | null>(null);
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
  const [selectedTransitionDividerIndex, setSelectedTransitionDividerIndex] = useState<number | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [timelineContainerWidth, setTimelineContainerWidth] = useState(0);
  const [currentProjectId, setCurrentProjectId] = useState(() => createProjectId());
  const [projectLibrary, setProjectLibrary] = useState<ProjectLibraryRecord[]>(() => readProjectLibraryFromStorage());
  const [draggedLibraryFormationId, setDraggedLibraryFormationId] = useState<string | null>(null);
  const [isStageLibraryDragOver, setIsStageLibraryDragOver] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordStatus, setRecordStatus] = useState<string | null>(null);
  const [playheadTime, setPlayheadTime] = useState(0);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioDataRef = useRef<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const stageAreaRef = useRef<HTMLDivElement>(null);
  const [stageScale, setStageScale] = useState(1);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const playStartWallRef = useRef(0);
  const playStartHeadRef = useRef(0);
  const animFrameRef = useRef(0);
  const manualTransitionStartRef = useRef(0);
  const manualTransitionDurationRef = useRef(0);
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
  const [isStagePeopleDragOver, setIsStagePeopleDragOver] = useState(false);
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const recordingCanvasRef = useRef<HTMLCanvasElement>(null);
  const peopleDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const dragMovedRef = useRef(false);
  const dragUndoPushedRef = useRef(false);
  const formationReorderMovedRef = useRef(false);
  const formationReorderUndoPushedRef = useRef(false);
  const suppressFormationClickRef = useRef(false);
  const transitionClearTimeoutRef = useRef<number | null>(null);
  const activePathPreviewDancerId = selectedDancerIds.size === 1 ? Array.from(selectedDancerIds)[0] : null;

  const selectedFormation = formations.find(f => f.id === selectedFormationId);

  const clampStageWidth = (value: number) => Math.max(STAGE_MIN_WIDTH, Math.min(STAGE_MAX_WIDTH, Math.round(value)));
  const clampStageHeight = (value: number) => Math.max(STAGE_MIN_HEIGHT, Math.min(STAGE_MAX_HEIGHT, Math.round(value)));
  const clampGridLines = (value: number) => Math.max(GRID_MIN_LINES, Math.min(GRID_MAX_LINES, Math.round(value)));
  const clampTransitionSeconds = (value: number) => Math.max(
    MIN_FORMATION_TRANSITION_SECONDS,
    Math.min(MAX_FORMATION_TRANSITION_SECONDS, Math.round(value * 100) / 100)
  );

  const safeStageWidth = Math.max(1, stageConfig.width);
  const safeStageHeight = Math.max(1, stageConfig.height);
  const getTransitionSecondsForDivider = (dividerIndex: number) => {
    if (dividerIndex < 0 || dividerIndex >= formations.length - 1) {
      return DEFAULT_FORMATION_TRANSITION_SECONDS;
    }
    return clampTransitionSeconds(formations[dividerIndex].transitionToNextSeconds ?? DEFAULT_FORMATION_TRANSITION_SECONDS);
  };

  const getTransitionMsForDivider = (dividerIndex: number) => Math.round(getTransitionSecondsForDivider(dividerIndex) * 1000);

  const formatTransitionSeconds = (seconds: number) => {
    const rounded = clampTransitionSeconds(seconds);
    if (Number.isInteger(rounded)) return `${rounded}`;
    return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  };

  const selectedTransitionDividerIsValid =
    selectedTransitionDividerIndex != null
    && selectedTransitionDividerIndex >= 0
    && selectedTransitionDividerIndex < formations.length - 1;
  const selectedDividerIndex = selectedTransitionDividerIsValid ? selectedTransitionDividerIndex : null;
  const selectedTransitionSeconds = selectedTransitionDividerIsValid
    ? getTransitionSecondsForDivider(selectedDividerIndex as number)
    : DEFAULT_FORMATION_TRANSITION_SECONDS;
  const selectedTransitionLabel = selectedTransitionDividerIsValid
    ? `${formations[selectedDividerIndex as number].name} -> ${formations[(selectedDividerIndex as number) + 1].name}`
    : 'Click a divider';

  const getStageCoordinates = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return null;

    return {
      x: Math.max(0, Math.min(safeStageWidth, (clientX - rect.left) / stageScale)),
      y: Math.max(0, Math.min(safeStageHeight, (clientY - rect.top) / stageScale))
    };
  };

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

  const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

  const getDefaultPathControlPoints = (type: PathType, start: PathPoint, end: PathPoint): PathPoint[] => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy) || 1;
    const normalX = -dy / length;
    const normalY = dx / length;
    const offset = Math.min(120, Math.max(40, length * 0.25));
    const midpoint = { x: start.x + dx * 0.5, y: start.y + dy * 0.5 };

    switch (type) {
      case 'quadratic':
        return [{
          x: midpoint.x + normalX * offset,
          y: midpoint.y + normalY * offset
        }];
      case 'cubic':
        return [
          {
            x: start.x + dx / 3 + normalX * offset,
            y: start.y + dy / 3 + normalY * offset
          },
          {
            x: start.x + (dx * 2) / 3 + normalX * offset,
            y: start.y + (dy * 2) / 3 + normalY * offset
          }
        ];
      case 'l-shape':
        return [{ x: end.x, y: start.y }];
      case 'straight':
      default:
        return [];
    }
  };

  const normalizePathForEndpoints = (path: DancerPath | undefined, start: PathPoint, end: PathPoint): DancerPath => {
    const type = path?.type ?? 'straight';
    const controlPoints = path?.controlPoints?.length
      ? path.controlPoints.map((point) => ({
          x: Math.max(0, Math.min(safeStageWidth, point.x)),
          y: Math.max(0, Math.min(safeStageHeight, point.y))
        }))
      : getDefaultPathControlPoints(type, start, end);

    return { type, controlPoints };
  };

  const getPointOnPath = (path: DancerPath | undefined, start: PathPoint, end: PathPoint, t: number): PathPoint => {
    const clampedT = clamp01(t);
    const normalized = normalizePathForEndpoints(path, start, end);

    if (normalized.type === 'quadratic') {
      const control = normalized.controlPoints[0] ?? getDefaultPathControlPoints('quadratic', start, end)[0];
      const inv = 1 - clampedT;
      return {
        x: inv * inv * start.x + 2 * inv * clampedT * control.x + clampedT * clampedT * end.x,
        y: inv * inv * start.y + 2 * inv * clampedT * control.y + clampedT * clampedT * end.y
      };
    }

    if (normalized.type === 'cubic') {
      const defaults = getDefaultPathControlPoints('cubic', start, end);
      const control1 = normalized.controlPoints[0] ?? defaults[0];
      const control2 = normalized.controlPoints[1] ?? defaults[1];
      const inv = 1 - clampedT;
      return {
        x: inv * inv * inv * start.x
          + 3 * inv * inv * clampedT * control1.x
          + 3 * inv * clampedT * clampedT * control2.x
          + clampedT * clampedT * clampedT * end.x,
        y: inv * inv * inv * start.y
          + 3 * inv * inv * clampedT * control1.y
          + 3 * inv * clampedT * clampedT * control2.y
          + clampedT * clampedT * clampedT * end.y
      };
    }

    if (normalized.type === 'l-shape') {
      const corner = normalized.controlPoints[0] ?? getDefaultPathControlPoints('l-shape', start, end)[0];
      if (clampedT <= 0.5) {
        const firstSegmentT = clampedT / 0.5;
        return {
          x: start.x + (corner.x - start.x) * firstSegmentT,
          y: start.y + (corner.y - start.y) * firstSegmentT
        };
      }
      const secondSegmentT = (clampedT - 0.5) / 0.5;
      return {
        x: corner.x + (end.x - corner.x) * secondSegmentT,
        y: corner.y + (end.y - corner.y) * secondSegmentT
      };
    }

    return {
      x: start.x + (end.x - start.x) * clampedT,
      y: start.y + (end.y - start.y) * clampedT
    };
  };

  const getSvgPathDefinition = (path: DancerPath | undefined, start: PathPoint, end: PathPoint) => {
    const normalized = normalizePathForEndpoints(path, start, end);
    if (normalized.type === 'quadratic') {
      const control = normalized.controlPoints[0];
      return `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;
    }
    if (normalized.type === 'cubic') {
      const [control1, control2] = normalized.controlPoints;
      return `M ${start.x} ${start.y} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${end.x} ${end.y}`;
    }
    if (normalized.type === 'l-shape') {
      const corner = normalized.controlPoints[0];
      return `M ${start.x} ${start.y} L ${corner.x} ${corner.y} L ${end.x} ${end.y}`;
    }
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  };

  const cloneTransitionPaths = (paths?: Record<string, DancerPath>) => {
    if (!paths) return undefined;
    return Object.fromEntries(
      Object.entries(paths).map(([dancerId, path]) => [
        dancerId,
        {
          type: path.type,
          controlPoints: path.controlPoints.map((point) => ({ ...point }))
        }
      ])
    );
  };

  const cloneFormations = (source: Formation[]) => source.map((formation) => ({
    ...formation,
    dancers: formation.dancers.map((dancerPos) => ({ ...dancerPos })),
    transitionPaths: cloneTransitionPaths(formation.transitionPaths)
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
        })),
        transitionPaths: formation.transitionPaths
          ? Object.fromEntries(
              Object.entries(formation.transitionPaths).map(([dancerId, path]) => [
                dancerId,
                {
                  ...path,
                  controlPoints: path.controlPoints.map((point) => ({
                    x: Math.max(0, Math.min(nextWidth, (point.x / prevWidth) * nextWidth)),
                    y: Math.max(0, Math.min(nextHeight, (point.y / prevHeight) * nextHeight))
                  }))
                }
              ])
            )
          : undefined
      })));
      setDancerAnimations([]);
      setIsAnimating(false);
    }

    setStageConfig(normalized);
    setShowSettingsDialog(false);
    setRecordStatus(`Stage set to ${normalized.width}x${normalized.height} (${Math.round(normalized.width / normalized.height * 100) / 100}:1), grid ${normalized.verticalGridLines}x${normalized.horizontalGridLines}.`);
  };

  const handleOpenNewProject = () => {
    stopPlayback();
    stopRecording();

    setCurrentProjectId(createProjectId());
    setShowHomeScreen(false);
    setIsPanelOpen(false);
    setIsPathEditMode(false);
    setFormations([]);
    setSelectedFormationId(null);
    setPreviousFormationId(null);
    setDancerAnimations([]);
    setIsAnimating(false);
    setEditingFormationId(null);
    setEditingNotes(false);
    setReorderedFormation(null);
    setDancers([]);
    setSelectedDancerIds(new Set());
    setDraggedDancer(null);
    setSelectionBox(null);
    setShowPeopleDropdown(false);
    setRemovalDialog(null);
    setProjectTitle('Hip Hop Piece Formations');
    setEditingProjectTitle(false);
    setContextMenu(null);
    setFormationDeleteDialog(null);
    undoStackRef.current = [];
    setUndoDepth(0);
    setShowAudioUpload(false);
    setAudioFile(null);
    setAudioDuration(null);
    audioBufferRef.current = null;
    audioDataRef.current = null;
    setSelectedTransitionDividerIndex(null);
    setIsPlaying(false);
    setIsRecording(false);
    setRecordStatus(null);
    setPlayheadTime(0);
    playheadTimeRef.current = 0;
    setIsDraggingPlayhead(false);
    setStageConfig(DEFAULT_STAGE_CONFIG);
    setSettingsDraft(DEFAULT_STAGE_CONFIG);
    setShowSettingsDialog(false);
    setShowHelpDialog(false);
    setShowSearchDropdown(false);
    setSearchQuery('');
    setDraggedLibraryFormationId(null);
    setIsStageLibraryDragOver(false);
  };

  const handleOpenExistingProject = (record: ProjectLibraryRecord) => {
    stopPlayback();
    stopRecording();

    // Reconstruct unique dancers (deduplicate by sourceDancerId)
    const dancerMap = new Map<string, Dancer>();
    record.formations.forEach((template) => {
      template.dancers.forEach((d) => {
        if (!dancerMap.has(d.sourceDancerId)) {
          dancerMap.set(d.sourceDancerId, {
            id: d.sourceDancerId,
            name: d.name,
            number: d.number,
            color: d.color,
          });
        }
      });
    });
    const reconstructedDancers = Array.from(dancerMap.values()).sort((a, b) => a.number - b.number);

    // Reconstruct formations with absolute positions from stored ratios
    const reconstructedFormations: Formation[] = record.formations.map((template) => ({
      id: template.formationId,
      name: template.formationName,
      startTime: 0,
      duration: template.duration,
      transitionToNextSeconds: clampTransitionSeconds(template.transitionToNextSeconds ?? record.transitionSeconds ?? DEFAULT_FORMATION_TRANSITION_SECONDS),
      notes: template.notes ?? '',
      dancers: template.dancers.map((d) => ({
        dancerId: d.sourceDancerId,
        x: d.xRatio * DEFAULT_STAGE_CONFIG.width,
        y: d.yRatio * DEFAULT_STAGE_CONFIG.height,
      })),
      transitionPaths: template.transitionPaths
        ? Object.fromEntries(
            Object.entries(template.transitionPaths).map(([dancerId, path]) => [
              dancerId,
              {
                type: path.type,
                controlPoints: path.controlPoints.map((point) => ({
                  x: point.xRatio * DEFAULT_STAGE_CONFIG.width,
                  y: point.yRatio * DEFAULT_STAGE_CONFIG.height
                }))
              }
            ])
          )
        : undefined
    }));

    setCurrentProjectId(record.projectId);
    setShowHomeScreen(false);
    setIsPanelOpen(false);
    setIsPathEditMode(false);
    setFormations(reconstructedFormations);
    setSelectedFormationId(reconstructedFormations.length > 0 ? reconstructedFormations[0].id : null);
    setPreviousFormationId(null);
    setDancerAnimations([]);
    setIsAnimating(false);
    setEditingFormationId(null);
    setEditingNotes(false);
    setReorderedFormation(null);
    setDancers(reconstructedDancers);
    setSelectedDancerIds(new Set());
    setDraggedDancer(null);
    setSelectionBox(null);
    setShowPeopleDropdown(false);
    setRemovalDialog(null);
    setProjectTitle(record.projectTitle);
    setEditingProjectTitle(false);
    setContextMenu(null);
    setFormationDeleteDialog(null);
    undoStackRef.current = [];
    setUndoDepth(0);
    setShowAudioUpload(false);
    setAudioFile(null);
    setAudioDuration(null);
    audioBufferRef.current = null;
    audioDataRef.current = null;
    setSelectedTransitionDividerIndex(null);
    setIsPlaying(false);
    setIsRecording(false);
    setRecordStatus(null);
    setPlayheadTime(0);
    playheadTimeRef.current = 0;
    setIsDraggingPlayhead(false);
    setStageConfig(DEFAULT_STAGE_CONFIG);
    setSettingsDraft(DEFAULT_STAGE_CONFIG);
    setShowSettingsDialog(false);
    setShowHelpDialog(false);
    setShowSearchDropdown(false);
    setSearchQuery('');
    setDraggedLibraryFormationId(null);
    setIsStageLibraryDragOver(false);

    // Restore audio if saved with the project
    if (record.audioData && record.audioFileName) {
      const savedAudioData = record.audioData;
      const savedAudioFileName = record.audioFileName;
      (async () => {
        try {
          const binaryString = atob(savedAudioData);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const audioCtx = new AudioContext();
          const audioBuffer = await audioCtx.decodeAudioData(bytes.buffer.slice(0));
          audioBufferRef.current = audioBuffer;
          audioCtx.close();
          const file = new File([bytes], savedAudioFileName);
          audioDataRef.current = savedAudioData;
          setAudioFile(file);
          setAudioDuration(audioBuffer.duration);
        } catch {
          // ignore errors restoring audio
        }
      })();
    }
  };

  const handleDeleteProject = (projectId: string) => {
    setProjectLibrary((prev) => {
      const next = prev.filter((p) => p.projectId !== projectId);
      try { window.localStorage.setItem(PROJECT_LIBRARY_STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleRenameProject = (projectId: string, newTitle: string) => {
    setProjectLibrary((prev) => {
      const next = prev.map((p) => p.projectId === projectId ? { ...p, projectTitle: newTitle } : p);
      try { window.localStorage.setItem(PROJECT_LIBRARY_STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
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

  const previousProjectFormations = projectLibrary
    .filter((project) => project.projectId !== currentProjectId)
    .flatMap((project) => project.formations);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredLibraryFormations = previousProjectFormations.filter((template) => {
    if (!normalizedSearchQuery) return true;
    const tokens = [
      template.formationName || '',
      template.projectTitle || '',
      template.dancerCount.toString(),
      `${template.dancerCount} dancer`,
      `${template.dancerCount} dancers`
    ].map((value) => value.toLowerCase());
    return tokens.some((token) => token.includes(normalizedSearchQuery));
  });

  const groupedLibraryFormations = filteredLibraryFormations.reduce<Record<number, LibraryFormationTemplate[]>>((acc, template) => {
    if (!acc[template.dancerCount]) {
      acc[template.dancerCount] = [];
    }
    acc[template.dancerCount].push(template);
    return acc;
  }, {});

  Object.values(groupedLibraryFormations).forEach((group) => {
    group.sort((a, b) => b.updatedAt - a.updatedAt);
  });

  const libraryDancerCountGroups = Object.keys(groupedLibraryFormations)
    .map((value) => Number(value))
    .sort((a, b) => b - a);

  const createNewFormation = () => {
    pushUndoSnapshot();
    // Start from the currently selected formation so users can keep editing that cast/placement.
    // Fallback to the last formation when nothing is selected.
    const selectedFormation = selectedFormationId
      ? formations.find((formation) => formation.id === selectedFormationId) ?? null
      : null;
    const sourceFormation = selectedFormation ?? (formations.length > 0 ? formations[formations.length - 1] : null);
    
    const newFormation: Formation = {
      id: `formation-${Date.now()}`,
      name: `Formation ${formations.length + 1}`,
      startTime: 0,
      duration: 170,
      transitionToNextSeconds: DEFAULT_FORMATION_TRANSITION_SECONDS,
      notes: '',
      dancers: sourceFormation ? sourceFormation.dancers.map((dancerPos) => ({ ...dancerPos })) : []
    };
    setFormations([...formations, newFormation]);
    setSelectedFormationId(newFormation.id);
    setSelectedTransitionDividerIndex(formations.length > 0 ? formations.length - 1 : null);
    // New formations at the end don't need shifts as they're placed after all others
  };

  const getLibraryTemplateById = (templateId: string) => (
    previousProjectFormations.find((template) => template.id === templateId) ?? null
  );

  const importFormationFromLibrary = (templateId: string) => {
    const template = getLibraryTemplateById(templateId);
    if (!template) {
      setRecordStatus('Could not find that library formation.');
      return;
    }

    pushUndoSnapshot();

    let nextDancerNumber = dancers.reduce((maxNumber, dancer) => Math.max(maxNumber, dancer.number), 0) + 1;
    const createdDancers: Dancer[] = [];
    const importedFormationDancerIds = new Set<string>();
    const signatureToExistingId = new Map<string, string>();

    dancers.forEach((dancer) => {
      const signature = `${dancer.name.trim().toLowerCase()}|${dancer.color.toLowerCase()}`;
      if (!signatureToExistingId.has(signature)) {
        signatureToExistingId.set(signature, dancer.id);
      }
    });

    const importedPositions: DancerPosition[] = template.dancers.map((templateDancer, idx) => {
      const dancerName = (templateDancer.name || '').trim() || `${nextDancerNumber}`;
      const dancerColor = (templateDancer.color || '').trim() || DANCER_COLOR_PALETTE[(nextDancerNumber - 1) % DANCER_COLOR_PALETTE.length];
      const signature = `${dancerName.toLowerCase()}|${dancerColor.toLowerCase()}`;
      const reusableDancerId = signatureToExistingId.get(signature);

      let targetDancerId = reusableDancerId && !importedFormationDancerIds.has(reusableDancerId)
        ? reusableDancerId
        : null;

      if (!targetDancerId) {
        const createdDancer: Dancer = {
          id: `dancer-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
          name: dancerName,
          number: nextDancerNumber,
          color: dancerColor
        };
        nextDancerNumber += 1;
        createdDancers.push(createdDancer);
        signatureToExistingId.set(signature, createdDancer.id);
        targetDancerId = createdDancer.id;
      }

      importedFormationDancerIds.add(targetDancerId);

      const xRatio = Number.isFinite(templateDancer.xRatio) ? templateDancer.xRatio : 0.5;
      const yRatio = Number.isFinite(templateDancer.yRatio) ? templateDancer.yRatio : 0.5;
      const x = Math.max(0, Math.min(safeStageWidth, xRatio * safeStageWidth));
      const y = Math.max(0, Math.min(safeStageHeight, yRatio * safeStageHeight));

      return {
        dancerId: targetDancerId,
        x,
        y
      };
    });

    const baseName = `${template.formationName || 'Imported Formation'} (Imported)`;
    let importedFormationName = baseName;
    let nameSuffix = 2;
    const existingNames = new Set(formations.map((formation) => formation.name.toLowerCase()));
    while (existingNames.has(importedFormationName.toLowerCase())) {
      importedFormationName = `${baseName} ${nameSuffix}`;
      nameSuffix += 1;
    }

    const importedFormation: Formation = {
      id: `formation-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: importedFormationName,
      startTime: 0,
      duration: Math.max(50, Math.round(template.duration || 170)),
      transitionToNextSeconds: clampTransitionSeconds(template.transitionToNextSeconds ?? DEFAULT_FORMATION_TRANSITION_SECONDS),
      notes: `Imported from ${template.projectTitle}`,
      dancers: importedPositions
    };

    if (createdDancers.length > 0) {
      setDancers([...dancers, ...createdDancers]);
    }
    setFormations([...formations, importedFormation]);
    setSelectedFormationId(importedFormation.id);
    setSelectedTransitionDividerIndex(formations.length > 0 ? formations.length - 1 : null);
    setPreviousFormationId(selectedFormationId);
    setSelectedDancerIds(new Set());
    setShowSearchDropdown(false);
    setSearchQuery('');
    setRecordStatus(`Imported "${template.formationName}" from ${template.projectTitle}.`);
  };

  const handleLibraryTemplateDragStart = (e: React.DragEvent<HTMLDivElement>, templateId: string) => {
    e.dataTransfer.setData(FORMATION_LIBRARY_DRAG_TYPE, templateId);
    e.dataTransfer.effectAllowed = 'copy';
    setDraggedLibraryFormationId(templateId);
  };

  const handleLibraryTemplateDragEnd = () => {
    setDraggedLibraryFormationId(null);
    setIsStageLibraryDragOver(false);
  };

  const handleStageLibraryDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const supportedDrag = Array.from(e.dataTransfer.types).includes(FORMATION_LIBRARY_DRAG_TYPE);
    if (!supportedDrag) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isStageLibraryDragOver) {
      setIsStageLibraryDragOver(true);
    }
  };

  const handleStageLibraryDragLeave = () => {
    setIsStageLibraryDragOver(false);
  };

  const handleStageLibraryDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const templateId = e.dataTransfer.getData(FORMATION_LIBRARY_DRAG_TYPE);
    if (!templateId) return;
    e.preventDefault();
    setIsStageLibraryDragOver(false);
    setDraggedLibraryFormationId(null);
    importFormationFromLibrary(templateId);
  };

  const handlePeopleDancerDragStart = (e: React.DragEvent<HTMLDivElement>, dancerId: string) => {
    e.dataTransfer.setData(PEOPLE_DANCER_DRAG_TYPE, dancerId);
    e.dataTransfer.effectAllowed = 'copy';
    setDraggedPeopleDancerId(dancerId);
  };

  const handlePeopleDancerDragEnd = () => {
    setDraggedPeopleDancerId(null);
    setIsStagePeopleDragOver(false);
  };

  const handleStagePeopleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const supportedDrag = Array.from(e.dataTransfer.types).includes(PEOPLE_DANCER_DRAG_TYPE);
    if (!supportedDrag || !selectedFormationId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isStagePeopleDragOver) {
      setIsStagePeopleDragOver(true);
    }
  };

  const handleStagePeopleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!stageRef.current?.contains(e.relatedTarget as Node | null)) {
      setIsStagePeopleDragOver(false);
    }
  };

  const handleStagePeopleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dancerId = e.dataTransfer.getData(PEOPLE_DANCER_DRAG_TYPE);
    if (!dancerId || !selectedFormationId) return;

    e.preventDefault();
    setIsStagePeopleDragOver(false);
    setDraggedPeopleDancerId(null);

    const coords = getStageCoordinates(e.clientX, e.clientY);
    if (!coords || !selectedFormation) return;

    const dancerExists = selectedFormation.dancers.some((dancerPos) => dancerPos.dancerId === dancerId);
    if (dancerExists) return;

    pushUndoSnapshot();
    setFormations(formations.map((formation) => (
      formation.id === selectedFormationId
        ? {
            ...formation,
            dancers: [...formation.dancers, { dancerId, x: coords.x, y: coords.y }]
          }
        : formation
    )));
    setSelectedDancerIds(new Set([dancerId]));
  };

  const handleStageDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    handleStageLibraryDragOver(e);
    handleStagePeopleDragOver(e);
  };

  const handleStageDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    handleStageLibraryDragOver(e);
    handleStagePeopleDragOver(e);
  };

  const handleStageDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    handleStageLibraryDragLeave();
    handleStagePeopleDragLeave(e);
  };

  const handleStageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (Array.from(e.dataTransfer.types).includes(PEOPLE_DANCER_DRAG_TYPE)) {
      handleStagePeopleDrop(e);
      return;
    }

    handleStageLibraryDrop(e);
  };

  const addDancerAtPosition = (x: number, y: number) => {
    if (!selectedFormationId) return;

    pushUndoSnapshot();

    const newDancer: Dancer = {
      id: `dancer-${Date.now()}`,
      name: `${dancers.length + 1}`,
      number: dancers.length + 1,
      color: DANCER_COLOR_PALETTE[dancers.length % DANCER_COLOR_PALETTE.length]
    };
    
    setDancers([...dancers, newDancer]);
    setSelectedDancerIds(new Set([newDancer.id]));
    
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

  const handleStageMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedFormationId) return;

    const target = e.target as HTMLElement;
    if (target.closest('.dancer-circle')) return;

    const coords = getStageCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    // Treat clicks within an expanded hit radius of any dancer as dancer clicks
    const DANCER_HIT_RADIUS = 35;
    const nearDancerPos = selectedFormation?.dancers.find(
      (d) => Math.hypot(d.x - coords.x, d.y - coords.y) <= DANCER_HIT_RADIUS
    );
    if (nearDancerPos) {
      handleDancerDragStart(e, nearDancerPos.dancerId);
      return;
    }

    if (isPathEditMode) {
      setSelectedDancerIds(new Set());
      return;
    }

    setSelectionBox({
      startX: coords.x,
      startY: coords.y,
      currentX: coords.x,
      currentY: coords.y,
      additive: e.shiftKey
    });
  };

  const handleDancerDragStart = (e: React.MouseEvent, dancerId: string) => {
    e.stopPropagation();

    if (!selectedFormation) return;

    if (isPathEditMode) {
      setSelectedDancerIds(new Set([dancerId]));
      return;
    }

    if (e.shiftKey) {
      setSelectedDancerIds((prev) => {
        const next = new Set(prev);
        if (next.has(dancerId)) {
          next.delete(dancerId);
        } else {
          next.add(dancerId);
        }
        return next;
      });
      return;
    }

    const coords = getStageCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    const selectedBeforeMouseDown = new Set(selectedDancerIds);
    const clickedWasInSelection = selectedBeforeMouseDown.has(dancerId);
    const shouldPreserveMultiSelectionOnClick = clickedWasInSelection && selectedBeforeMouseDown.size > 1;
    const dragIds = shouldPreserveMultiSelectionOnClick ? Array.from(selectedBeforeMouseDown) : [dancerId];

    if (!shouldPreserveMultiSelectionOnClick) {
      setSelectedDancerIds(new Set([dancerId]));
    }

    const formationPositions = new Map(selectedFormation.dancers.map((dancerPos) => [dancerPos.dancerId, dancerPos]));
    const initialPositions = dragIds.reduce<Record<string, { x: number; y: number }>>((acc, id) => {
      const dancerPos = formationPositions.get(id);
      if (dancerPos) {
        acc[id] = { x: dancerPos.x, y: dancerPos.y };
      }
      return acc;
    }, {});
    const anchorPosition = initialPositions[dancerId];
    if (!anchorPosition) return;

    dragMovedRef.current = false;
    dragUndoPushedRef.current = false;
    setDraggedDancer({
      dancerIds: dragIds,
      anchorId: dancerId,
      offsetX: coords.x - anchorPosition.x,
      offsetY: coords.y - anchorPosition.y,
      initialPositions,
      preserveMultiSelectionOnClick: shouldPreserveMultiSelectionOnClick
    });
  };

  const handleDancerDragMove = (e: MouseEvent) => {
    if (!draggedDancer || !stageRef.current || !selectedFormationId) return;
    
    const coords = getStageCoordinates(e.clientX, e.clientY);
    if (!coords) return;
    const anchorStart = draggedDancer.initialPositions[draggedDancer.anchorId];
    if (!anchorStart) return;

    const rawDeltaX = coords.x - draggedDancer.offsetX - anchorStart.x;
    const rawDeltaY = coords.y - draggedDancer.offsetY - anchorStart.y;
    const positions = Object.values(draggedDancer.initialPositions);
    const minX = Math.min(...positions.map((pos) => pos.x));
    const maxX = Math.max(...positions.map((pos) => pos.x));
    const minY = Math.min(...positions.map((pos) => pos.y));
    const maxY = Math.max(...positions.map((pos) => pos.y));
    const deltaX = Math.max(-minX, Math.min(safeStageWidth - maxX, rawDeltaX));
    const deltaY = Math.max(-minY, Math.min(safeStageHeight - maxY, rawDeltaY));

    if (Math.abs(deltaX) > STAGE_DRAG_THRESHOLD || Math.abs(deltaY) > STAGE_DRAG_THRESHOLD) {
      dragMovedRef.current = true;
    }
    if (dragMovedRef.current && !dragUndoPushedRef.current) {
      pushUndoSnapshot();
      dragUndoPushedRef.current = true;
    }
    
    setFormations(formations.map(f => {
      if (f.id === selectedFormationId) {
        return {
          ...f,
          dancers: f.dancers.map(d => {
            const initial = draggedDancer.initialPositions[d.dancerId];
            return initial ? { ...d, x: initial.x + deltaX, y: initial.y + deltaY } : d;
          })
        };
      }
      return f;
    }));
  };

  const handleDancerDragEnd = () => {
    if (draggedDancer && !dragMovedRef.current && draggedDancer.preserveMultiSelectionOnClick) {
      setSelectedDancerIds(new Set([draggedDancer.anchorId]));
    }

    dragMovedRef.current = false;
    dragUndoPushedRef.current = false;
    setDraggedDancer(null);
  };

  const handlePathHandleDragMove = (e: MouseEvent) => {
    if (!draggedPathHandle || !selectedFormationId) return;
    const coords = getStageCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    setFormations((prevFormations) => prevFormations.map((formation) => {
      if (formation.id !== selectedFormationId) return formation;
      const existingPath = formation.transitionPaths?.[draggedPathHandle.dancerId];
      if (!existingPath) return formation;
      return {
        ...formation,
        transitionPaths: {
          ...(formation.transitionPaths ?? {}),
          [draggedPathHandle.dancerId]: {
            ...existingPath,
            controlPoints: existingPath.controlPoints.map((point, index) => (
              index === draggedPathHandle.controlIndex ? coords : point
            ))
          }
        }
      };
    }));
  };

  const handlePathHandleDragEnd = () => {
    setDraggedPathHandle(null);
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
    const targetIds = selectedDancerIds.has(dancerId) ? selectedDancerIds : new Set([dancerId]);
    const dancersToUpdate = dancers.filter((d) => targetIds.has(d.id));
    if (dancersToUpdate.length === 0 || dancersToUpdate.every((d) => d.color === newColor)) return;

    pushUndoSnapshot();
    setDancers(dancers.map((d) => (targetIds.has(d.id) ? { ...d, color: newColor } : d)));
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

  // Calculate the nearest horizontal stage edge for a dancer position
  const getNearestEdge = (x: number, y: number) => {
    void y;
    return x <= safeStageWidth / 2 ? 'left' : 'right';
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

  const getNextFormationFor = (formationId: string | null) => {
    if (!formationId) return null;
    const currentIndex = formations.findIndex((formation) => formation.id === formationId);
    if (currentIndex < 0 || currentIndex >= formations.length - 1) return null;
    return formations[currentIndex + 1];
  };

  const getTransitionPathForDancer = (formation: Formation | undefined, dancerId: string, start: PathPoint, end: PathPoint) =>
    normalizePathForEndpoints(formation?.transitionPaths?.[dancerId], start, end);

  const updateTransitionPathForDancer = (formationId: string, dancerId: string, nextPath: DancerPath) => {
    setFormations((prevFormations) => prevFormations.map((formation) => {
      if (formation.id !== formationId) return formation;
      return {
        ...formation,
        transitionPaths: {
          ...(formation.transitionPaths ?? {}),
          [dancerId]: {
            type: nextPath.type,
            controlPoints: nextPath.controlPoints.map((point) => ({ ...point }))
          }
        }
      };
    }));
  };

  const handleFormationClick = (id: string) => {
    if (suppressFormationClickRef.current) {
      suppressFormationClickRef.current = false;
      return;
    }

    const currentFormation = formations.find(f => f.id === selectedFormationId);
    const nextFormation = formations.find(f => f.id === id);
    
    if (!currentFormation || !nextFormation) {
      setSelectedFormationId(id);
      setPreviousFormationId(selectedFormationId);
      setSelectedDancerIds(new Set());
      return;
    }

    let resolvedNextFormation = nextFormation;
    const shouldCarryDancersIntoEmptyFormation =
      !isPlaying &&
      !isRecording &&
      currentFormation.dancers.length > 0 &&
      nextFormation.dancers.length === 0;

    if (shouldCarryDancersIntoEmptyFormation) {
      const carriedDancers = currentFormation.dancers.map((dancerPos) => ({ ...dancerPos }));
      pushUndoSnapshot();
      setFormations((prevFormations) => prevFormations.map((formation) => (
        formation.id === id
          ? { ...formation, dancers: carriedDancers }
          : formation
      )));
      resolvedNextFormation = { ...nextFormation, dancers: carriedDancers };
    }

    const currentIndex = formations.findIndex(f => f.id === selectedFormationId);
    const nextIndex = formations.findIndex(f => f.id === id);

    const transitionMs = nextIndex === currentIndex + 1
      ? getTransitionMsForDivider(currentIndex)
      : 0;
    const shouldAnimate = nextIndex === currentIndex + 1 && transitionMs > 0;

    // Only animate if clicking the directly next formation
    if (shouldAnimate) {
      const animations: DancerAnimation[] = [];
      
      // Get dancer IDs in current and next formations
      const currentDancerIds = new Set(currentFormation.dancers.map(d => d.dancerId));
      const nextDancerIds = new Set(resolvedNextFormation.dancers.map(d => d.dancerId));
      
      // Dancers moving between formations
      currentFormation.dancers.forEach(dancerPos => {
        if (nextDancerIds.has(dancerPos.dancerId)) {
          // Dancer exists in both - animate to new position
          const nextPos = resolvedNextFormation.dancers.find(d => d.dancerId === dancerPos.dancerId);
          if (nextPos) {
            animations.push({
              dancerId: dancerPos.dancerId,
              startX: dancerPos.x,
              startY: dancerPos.y,
              endX: nextPos.x,
              endY: nextPos.y,
              type: 'move',
              path: getTransitionPathForDancer(
                currentFormation,
                dancerPos.dancerId,
                { x: dancerPos.x, y: dancerPos.y },
                { x: nextPos.x, y: nextPos.y }
              )
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
      resolvedNextFormation.dancers.forEach(dancerPos => {
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
      setManualTransitionProgress(0);
      setPreviousFormationId(selectedFormationId);
      setSelectedFormationId(id);
      manualTransitionStartRef.current = performance.now();
      manualTransitionDurationRef.current = transitionMs;

      const transitionTick = () => {
        const elapsed = performance.now() - manualTransitionStartRef.current;
        const progress = transitionMs <= 0 ? 1 : Math.min(1, elapsed / transitionMs);
        setManualTransitionProgress(progress);
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(transitionTick);
        }
      };
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(transitionTick);

      // Clear animation state after transition
      if (transitionClearTimeoutRef.current !== null) {
        window.clearTimeout(transitionClearTimeoutRef.current);
      }
      transitionClearTimeoutRef.current = window.setTimeout(() => {
        cancelAnimationFrame(animFrameRef.current);
        setIsAnimating(false);
        setManualTransitionProgress(0);
        setDancerAnimations([]);
        transitionClearTimeoutRef.current = null;
      }, transitionMs);
    } else {
      // Not adjacent or going backwards - just switch
      if (transitionClearTimeoutRef.current !== null) {
        window.clearTimeout(transitionClearTimeoutRef.current);
        transitionClearTimeoutRef.current = null;
      }
      cancelAnimationFrame(animFrameRef.current);
      setIsAnimating(false);
      setManualTransitionProgress(0);
      setDancerAnimations([]);
      setPreviousFormationId(selectedFormationId);
      setSelectedFormationId(id);
    }
    setSelectedDancerIds(new Set());
  };

  const handleSelectionBoxMove = (e: MouseEvent) => {
    setSelectionBox((current) => {
      if (!current) return current;

      const coords = getStageCoordinates(e.clientX, e.clientY);
      if (!coords) return current;

      return {
        ...current,
        currentX: coords.x,
        currentY: coords.y
      };
    });
  };

  const handleSelectionBoxEnd = () => {
    if (!selectionBox || !selectedFormation) return;

    const left = Math.min(selectionBox.startX, selectionBox.currentX);
    const right = Math.max(selectionBox.startX, selectionBox.currentX);
    const top = Math.min(selectionBox.startY, selectionBox.currentY);
    const bottom = Math.max(selectionBox.startY, selectionBox.currentY);
    const isDragSelection = Math.abs(selectionBox.currentX - selectionBox.startX) > STAGE_DRAG_THRESHOLD
      || Math.abs(selectionBox.currentY - selectionBox.startY) > STAGE_DRAG_THRESHOLD;

    if (!isDragSelection) {
      addDancerAtPosition(selectionBox.startX, selectionBox.startY);
      setSelectionBox(null);
      return;
    }

    const idsInBox = selectedFormation.dancers
      .filter((dancerPos) => (
        dancerPos.x >= left
        && dancerPos.x <= right
        && dancerPos.y >= top
        && dancerPos.y <= bottom
      ))
      .map((dancerPos) => dancerPos.dancerId);

    setSelectedDancerIds((prev) => (
      selectionBox.additive ? new Set([...prev, ...idsInBox]) : new Set(idsInBox)
    ));
    setSelectionBox(null);
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
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
      setAudioDuration(audioBuffer.duration);
      audioBufferRef.current = audioBuffer;
      audioCtx.close();
      // Convert to base64 for persistence
      const uint8 = new Uint8Array(arrayBuffer);
      const CHUNK = 8192;
      let binary = '';
      for (let i = 0; i < uint8.length; i += CHUNK) {
        binary += String.fromCharCode(...uint8.subarray(i, i + CHUNK));
      }
      audioDataRef.current = btoa(binary);
    } catch {
      setAudioDuration(null);
      audioBufferRef.current = null;
      audioDataRef.current = null;
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
        return { formation, index, start, end, segmentDuration };
      });
    }

    // Fallback for initial layout before timeline width is measured.
    const totalUnits = formations.reduce((sum, f) => sum + f.duration, 0);
    const safeTotalUnits = totalUnits > 0 ? totalUnits : 1;
    let cursor = 0;
    return formations.map((formation, index) => {
      const start = (cursor / safeTotalUnits) * duration;
      const segmentDuration = (formation.duration / safeTotalUnits) * duration;
      const end = start + segmentDuration;
      cursor += formation.duration;
      return { formation, index, start, end, segmentDuration };
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
    const transitionSeconds = getTransitionSecondsForDivider(previous.index);
    const transitionDuration = Math.min(transitionSeconds, current.segmentDuration);
    if (transitionDuration <= 0 || localTime >= transitionDuration) {
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
        const path = getTransitionPathForDancer(previous.formation, dancerId, prevPos, currentPos);
        const point = getPointOnPath(path, prevPos, currentPos, t);
        rendered.push({
          dancerId,
          x: point.x,
          y: point.y,
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

  useEffect(() => {
    if (!draggedPathHandle) return;

    window.addEventListener('mousemove', handlePathHandleDragMove);
    window.addEventListener('mouseup', handlePathHandleDragEnd);
    return () => {
      window.removeEventListener('mousemove', handlePathHandleDragMove);
      window.removeEventListener('mouseup', handlePathHandleDragEnd);
    };
  }, [draggedPathHandle, selectedFormationId, formations]);

  const executeDeleteFormation = (formationId: string) => {
    const newFormations = formations.filter((f) => f.id !== formationId);
    if (newFormations.length === formations.length) {
      setContextMenu(null);
      setFormationDeleteDialog(null);
      return;
    }
    pushUndoSnapshot();
    setFormations(newFormations);
    if (newFormations.length === 0) {
      setDancers([]);
      setSelectedDancerIds(new Set());
    }
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

  const setTransitionForDivider = (dividerIndex: number, nextSeconds: number) => {
    if (dividerIndex < 0 || dividerIndex >= formations.length - 1) return;
    const clamped = clampTransitionSeconds(nextSeconds);
    const current = getTransitionSecondsForDivider(dividerIndex);
    if (current === clamped) return;
    pushUndoSnapshot();
    setFormations((prevFormations) => prevFormations.map((formation, index) => (
      index === dividerIndex
        ? { ...formation, transitionToNextSeconds: clamped }
        : formation
    )));
  };

  const adjustSelectedTransitionDivider = (delta: number) => {
    if (!selectedTransitionDividerIsValid) return;
    setTransitionForDivider(selectedTransitionDividerIndex as number, selectedTransitionSeconds + delta);
  };

  const handleResizeStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const formation = formations.find(f => f.id === id);
    if (formation) {
      pushUndoSnapshot();
      setResizedFormation({
        id,
        startX: e.clientX,
        startDuration: formation.duration
      });
    }
  };

  const handleFormationReorderStart = (e: React.MouseEvent, id: string) => {
    if (!timelineRef.current || editingFormationId === id) return;

    const blockRect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    formationReorderMovedRef.current = false;
    formationReorderUndoPushedRef.current = false;
    suppressFormationClickRef.current = false;
    setReorderedFormation({
      id,
      startX: e.clientX,
      pointerOffsetX: e.clientX - blockRect.left,
      currentX: e.clientX
    });
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizedFormation) return;
    const deltaX = e.clientX - resizedFormation.startX;
    const newDuration = Math.max(50, resizedFormation.startDuration + deltaX);
    setFormations(formations.map(f =>
      f.id === resizedFormation.id ? { ...f, duration: newDuration } : f
    ));
  };

  const handleFormationReorderMove = (e: MouseEvent) => {
    if (!reorderedFormation || !timelineRef.current) return;

    setReorderedFormation((current) => current ? { ...current, currentX: e.clientX } : current);

    const rect = timelineRef.current.getBoundingClientRect();
    const dragLeft = e.clientX - rect.left - reorderedFormation.pointerOffsetX;
    const dragWidth = formations.find((formation) => formation.id === reorderedFormation.id)?.duration ?? 0;
    const dragCenter = dragLeft + (dragWidth / 2);

    if (Math.abs(e.clientX - reorderedFormation.startX) > STAGE_DRAG_THRESHOLD) {
      formationReorderMovedRef.current = true;
    }

    const withoutDragged = formations.filter((formation) => formation.id !== reorderedFormation.id);
    let cursor = 40;
    let targetIndex = withoutDragged.length;
    for (let idx = 0; idx < withoutDragged.length; idx += 1) {
      const formation = withoutDragged[idx];
      const center = cursor + (formation.duration / 2);
      if (dragCenter < center) {
        targetIndex = idx;
        break;
      }
      cursor += formation.duration;
    }

    const currentIndex = formations.findIndex((formation) => formation.id === reorderedFormation.id);
    const normalizedTargetIndex = Math.max(0, Math.min(targetIndex, formations.length - 1));
    if (currentIndex === -1 || currentIndex === normalizedTargetIndex) return;

    if (!formationReorderUndoPushedRef.current) {
      pushUndoSnapshot();
      formationReorderUndoPushedRef.current = true;
    }

    const dragged = formations[currentIndex];
    const nextFormations = formations.filter((formation) => formation.id !== reorderedFormation.id);
    nextFormations.splice(normalizedTargetIndex, 0, dragged);
    setFormations(nextFormations);
    formationReorderMovedRef.current = true;
  };

  const handleResizeEnd = () => {
    setResizedFormation(null);
  };

  const handleFormationReorderEnd = () => {
    if (formationReorderMovedRef.current) {
      suppressFormationClickRef.current = true;
    }
    formationReorderMovedRef.current = false;
    formationReorderUndoPushedRef.current = false;
    setReorderedFormation(null);
  };

  // Timeline resize listeners
  useEffect(() => {
    if (resizedFormation) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizedFormation, formations]);

  useEffect(() => {
    if (reorderedFormation) {
      window.addEventListener('mousemove', handleFormationReorderMove);
      window.addEventListener('mouseup', handleFormationReorderEnd);
      return () => {
        window.removeEventListener('mousemove', handleFormationReorderMove);
        window.removeEventListener('mouseup', handleFormationReorderEnd);
      };
    }
  }, [reorderedFormation, formations]);

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

  useEffect(() => {
    if (selectionBox) {
      window.addEventListener('mousemove', handleSelectionBoxMove);
      window.addEventListener('mouseup', handleSelectionBoxEnd);
      return () => {
        window.removeEventListener('mousemove', handleSelectionBoxMove);
        window.removeEventListener('mouseup', handleSelectionBoxEnd);
      };
    }
  }, [selectionBox, selectedFormation]);

  useEffect(() => {
    if (!selectedFormation) {
      if (selectedDancerIds.size > 0) {
        setSelectedDancerIds(new Set());
      }
      return;
    }

    const formationDancerIds = new Set(selectedFormation.dancers.map((dancerPos) => dancerPos.dancerId));
    setSelectedDancerIds((prev) => {
      const next = new Set(Array.from(prev).filter((id) => formationDancerIds.has(id)));
      if (next.size === prev.size && Array.from(next).every((id) => prev.has(id))) {
        return prev;
      }
      return next;
    });
  }, [selectedFormation]);

  useEffect(() => {
    if (!isPathEditMode) return;
    setSelectedDancerIds((prev) => {
      if (prev.size <= 1) return prev;
      return new Set([Array.from(prev)[0]]);
    });
  }, [isPathEditMode]);

  useEffect(() => {
    if (!isPathEditMode || !selectedFormation || selectedDancerIds.size === 0) return;
    const nextFormation = getNextFormationFor(selectedFormation.id);
    if (!nextFormation) return;

    const selectedId = Array.from(selectedDancerIds)[0];
    const existsInCurrent = selectedFormation.dancers.some((dancerPos) => dancerPos.dancerId === selectedId);
    const existsInNext = nextFormation.dancers.some((dancerPos) => dancerPos.dancerId === selectedId);
    if (!existsInCurrent || !existsInNext) {
      setSelectedDancerIds(new Set());
    }
  }, [isPathEditMode, selectedFormation, selectedDancerIds, formations]);

  useEffect(() => {
    setSelectedTransitionDividerIndex((current) => {
      if (current == null) return current;
      const maxDividerIndex = formations.length - 2;
      if (maxDividerIndex < 0) return null;
      return Math.max(0, Math.min(current, maxDividerIndex));
    });
  }, [formations.length]);

  useEffect(() => {
    if (showHomeScreen) return;

    const dancerById = new Map(dancers.map((dancer) => [dancer.id, dancer]));
    const now = Date.now();
    const normalizedProjectTitle = projectTitle.trim() || 'Untitled Project';

    const savedFormations: LibraryFormationTemplate[] = formations.map((formation) => {
      const savedDancers: LibraryFormationDancer[] = formation.dancers.map((dancerPos) => {
        const dancerMeta = dancerById.get(dancerPos.dancerId);
        const fallbackNumber = dancerMeta?.number ?? 0;
        return {
          sourceDancerId: dancerPos.dancerId,
          name: dancerMeta?.name ?? `Dancer ${fallbackNumber}`,
          color: dancerMeta?.color ?? DANCER_COLOR_PALETTE[fallbackNumber % DANCER_COLOR_PALETTE.length],
          number: fallbackNumber,
          xRatio: safeStageWidth > 0 ? Math.max(0, Math.min(1, dancerPos.x / safeStageWidth)) : 0,
          yRatio: safeStageHeight > 0 ? Math.max(0, Math.min(1, dancerPos.y / safeStageHeight)) : 0
        };
      });

      return {
        id: `${currentProjectId}::${formation.id}`,
        projectId: currentProjectId,
        projectTitle: normalizedProjectTitle,
        formationId: formation.id,
        formationName: formation.name,
        duration: formation.duration,
        transitionToNextSeconds: clampTransitionSeconds(formation.transitionToNextSeconds ?? DEFAULT_FORMATION_TRANSITION_SECONDS),
        notes: formation.notes,
        dancerCount: savedDancers.length,
        dancers: savedDancers,
        transitionPaths: formation.transitionPaths
          ? Object.fromEntries(
              Object.entries(formation.transitionPaths).map(([dancerId, path]) => [
                dancerId,
                {
                  type: path.type,
                  controlPoints: path.controlPoints.map((point) => ({
                    xRatio: safeStageWidth > 0 ? Math.max(0, Math.min(1, point.x / safeStageWidth)) : 0,
                    yRatio: safeStageHeight > 0 ? Math.max(0, Math.min(1, point.y / safeStageHeight)) : 0
                  }))
                }
              ])
            )
          : undefined,
        updatedAt: now
      };
    }).filter((formation) => formation.dancerCount > 0);

    const currentProjectRecord: ProjectLibraryRecord = {
      projectId: currentProjectId,
      projectTitle: normalizedProjectTitle,
      updatedAt: now,
      formations: savedFormations,
      // Legacy project-level transition value retained for backwards compatibility.
      transitionSeconds: DEFAULT_FORMATION_TRANSITION_SECONDS,
      audioFileName: audioFile?.name,
      audioData: audioDataRef.current ?? undefined,
    };

    setProjectLibrary((prevProjects) => {
      const otherProjects = prevProjects.filter((project) => project.projectId !== currentProjectId);
      const nextProjects = [currentProjectRecord, ...otherProjects]
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, PROJECT_LIBRARY_MAX_PROJECTS);
      try {
        window.localStorage.setItem(PROJECT_LIBRARY_STORAGE_KEY, JSON.stringify(nextProjects));
      } catch {
        // Storage can fail in private mode or full quota; keep in-memory data.
      }
      return nextProjects;
    });
  }, [showHomeScreen, currentProjectId, projectTitle, formations, dancers, safeStageWidth, safeStageHeight, audioFile]);

  // Persist the last-open project ID so a page reload can reopen it
  useEffect(() => {
    try {
      if (!showHomeScreen) {
        window.localStorage.setItem(LAST_OPEN_PROJECT_KEY, currentProjectId);
      } else {
        window.localStorage.removeItem(LAST_OPEN_PROJECT_KEY);
      }
    } catch {}
  }, [showHomeScreen, currentProjectId]);

  // On mount, reopen the last project the user had open before a page reload.
  // Uses INITIAL_LAST_OPEN_PROJECT_ID captured at module load time so the save
  // effect (which clears the key when showHomeScreen=true) can't race against it.
  useEffect(() => {
    if (!INITIAL_LAST_OPEN_PROJECT_ID) return;
    const record = projectLibrary.find((p) => p.projectId === INITIAL_LAST_OPEN_PROJECT_ID);
    if (record) handleOpenExistingProject(record);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scale the stage to fit the available screen area
  useEffect(() => {
    const compute = () => {
      // Known fixed chrome heights: top bar (67px) + toolbar (56px) + timeline (150px)
      const chromeH = 67 + 56 + 150;
      const containerH = window.innerHeight - chromeH;
      // Left panel is absolutely positioned (280px) but sits over the stage area,
      // so we only subtract it from width when it's open.
      const containerW = window.innerWidth - (isPanelOpen ? 281 : 0);

      // Vertical overhead inside the stage area: p-8 padding (32*2), formation
      // name label (~28px), audience label (~32px), two gap-6 gaps (24*2).
      const vertOverhead = 32 * 2 + 28 + 32 + 24 * 2;
      // Horizontal overhead: p-8 padding (32*2), notes box + gap (250+24).
      const notesAndGap = 250 + 24;
      const horizOverhead = 32 * 2;

      const scaleW = (containerW - horizOverhead) / (safeStageWidth + notesAndGap);
      const scaleH = (containerH - vertOverhead) / safeStageHeight;
      const scale = Math.min(scaleW, scaleH, 1);
      setStageScale(Math.max(0.15, scale));
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [safeStageWidth, safeStageHeight, isPanelOpen, showHomeScreen]);

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

      const isDeleteKey = e.key === 'Delete' || e.key === 'Backspace';

      // Confirm formation deletion when dialog is open
      if (!isTypingTarget && formationDeleteDialog && (isDeleteKey || e.key === 'Enter')) {
        e.preventDefault();
        executeDeleteFormation(formationDeleteDialog.formationId);
        return;
      }

      // Confirm dancer removal when dialog is open
      if (!isTypingTarget && removalDialog && (isDeleteKey || e.key === 'Enter')) {
        e.preventDefault();
        handleRemoveDancer('this');
        return;
      }

      if (!isTypingTarget && isDeleteKey) {
        // Delete selected dancers first (if any are selected in the current formation)
        if (selectedDancerIds.size > 0 && selectedFormationId && !removalDialog) {
          e.preventDefault();
          const firstId = Array.from(selectedDancerIds)[0];
          const dancer = dancers.find(d => d.id === firstId);
          if (dancer) setRemovalDialog({ dancerId: dancer.id, dancerName: dancer.name });
          return;
        }
        // Otherwise open formation delete dialog
        if (selectedFormationId && !formationDeleteDialog) {
          e.preventDefault();
          openFormationDeleteDialog(selectedFormationId);
          return;
        }
      }

      const isUndo = (e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'z';
      if (!isTypingTarget && isUndo && undoStackRef.current.length > 0) {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFormationId, selectedDancerIds, dancers, formationDeleteDialog, removalDialog, showHelpDialog, showSettingsDialog]);

  // Keep playheadTimeRef in sync for drag handlers
  useEffect(() => { playheadTimeRef.current = playheadTime; }, [playheadTime]);

  // Global cleanup for media resources
  useEffect(() => {
    return () => {
      stopPlayback();
      stopRecording();
      if (transitionClearTimeoutRef.current !== null) {
        window.clearTimeout(transitionClearTimeoutRef.current);
        transitionClearTimeoutRef.current = null;
      }
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

  const selectedFormationNext = getNextFormationFor(selectedFormationId);
  const selectedPathEditDancer = activePathPreviewDancerId
    ? selectedFormation?.dancers.find((dancerPos) => dancerPos.dancerId === activePathPreviewDancerId) ?? null
    : null;
  const selectedPathEditDancerNext = activePathPreviewDancerId
    ? selectedFormationNext?.dancers.find((dancerPos) => dancerPos.dancerId === activePathPreviewDancerId) ?? null
    : null;
  const selectedPathEditPath = selectedFormation && selectedPathEditDancer && selectedPathEditDancerNext
    ? getTransitionPathForDancer(
        selectedFormation,
        selectedPathEditDancer.dancerId,
        { x: selectedPathEditDancer.x, y: selectedPathEditDancer.y },
        { x: selectedPathEditDancerNext.x, y: selectedPathEditDancerNext.y }
      )
    : null;
  const selectedPathType = selectedPathEditPath?.type ?? 'straight';

  const handlePathTypeChange = (pathType: PathType) => {
    if (!selectedFormation || !selectedPathEditDancer || !selectedPathEditDancerNext) return;
    if (selectedPathType === pathType) return;
    pushUndoSnapshot();
    updateTransitionPathForDancer(
      selectedFormation.id,
      selectedPathEditDancer.dancerId,
      {
        type: pathType,
        controlPoints: getDefaultPathControlPoints(
          pathType,
          { x: selectedPathEditDancer.x, y: selectedPathEditDancer.y },
          { x: selectedPathEditDancerNext.x, y: selectedPathEditDancerNext.y }
        )
      }
    );
  };

  const handlePathHandleMouseDown = (e: React.MouseEvent, dancerId: string, controlIndex: number) => {
    e.stopPropagation();
    pushUndoSnapshot();
    setDraggedPathHandle({ dancerId, controlIndex });
  };

  const renderedStageDancers = isAnimating
    ? dancerAnimations.map((animation) => {
        const dancer = dancers.find((d) => d.id === animation.dancerId);
        if (!dancer) return null;

        const point = animation.type === 'move'
          ? getPointOnPath(
              animation.path,
              { x: animation.startX, y: animation.startY },
              { x: animation.endX, y: animation.endY },
              manualTransitionProgress
            )
          : {
              x: animation.startX + (animation.endX - animation.startX) * manualTransitionProgress,
              y: animation.startY + (animation.endY - animation.startY) * manualTransitionProgress
            };

        const opacity = animation.type === 'exit'
          ? 1 - manualTransitionProgress
          : animation.type === 'enter'
            ? manualTransitionProgress
            : 1;

        return {
          key: `${animation.type}-${animation.dancerId}`,
          dancer,
          dancerId: animation.dancerId,
          x: point.x,
          y: point.y,
          opacity,
          isSelected: selectedDancerIds.has(animation.dancerId)
        };
      }).filter((value): value is {
        key: string;
        dancer: Dancer;
        dancerId: string;
        x: number;
        y: number;
        opacity: number;
        isSelected: boolean;
      } => value !== null)
    : selectedFormation?.dancers.map((dancerPos) => {
        const dancer = dancers.find((d) => d.id === dancerPos.dancerId);
        if (!dancer) return null;

        return {
          key: dancerPos.dancerId,
          dancer,
          dancerId: dancer.id,
          x: dancerPos.x,
          y: dancerPos.y,
          opacity: 1,
          isSelected: selectedDancerIds.has(dancer.id)
        };
      }).filter((value): value is {
        key: string;
        dancer: Dancer;
        dancerId: string;
        x: number;
        y: number;
        opacity: number;
        isSelected: boolean;
      } => value !== null) ?? [];

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
    return (
      <HomeScreen
        projects={projectLibrary}
        onNewProject={handleOpenNewProject}
        onOpenProject={handleOpenExistingProject}
        onDeleteProject={handleDeleteProject}
        onRenameProject={handleRenameProject}
      />
    );
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
                className="absolute top-[calc(100%+4px)] left-0 bg-[#252525] border border-[#333] rounded-[7px] shadow-lg z-50 w-[430px]"
              >
                <div className="p-3 border-b border-[#333]">
                  <input
                    type="text"
                    className="w-full bg-transparent text-white text-[14px] px-3 py-2 rounded-[5px] outline-none border border-white/50 focus:border-white placeholder:text-white/20"
                    placeholder="Search formations, project name, or dancer count"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="p-3 flex flex-col gap-3 max-h-[360px] overflow-y-auto">
                  {previousProjectFormations.length === 0 ? (
                    <div className="px-3 py-3 text-[#777] text-[13px] leading-relaxed">
                      No saved formations from previous projects yet.
                      Open another project and create formations to build your searchable library.
                    </div>
                  ) : filteredLibraryFormations.length === 0 ? (
                    <div className="px-3 py-3 text-[#777] text-[13px]">No matching formations found.</div>
                  ) : (
                    libraryDancerCountGroups.map((dancerCount) => (
                      <div key={dancerCount} className="flex flex-col gap-2">
                        <div className="px-1 text-[#999] text-[12px] uppercase tracking-wide">
                          {dancerCount} {dancerCount === 1 ? 'Dancer' : 'Dancers'}
                        </div>
                        {groupedLibraryFormations[dancerCount].map((template) => (
                          <div
                            key={template.id}
                            draggable
                            onDragStart={(e) => handleLibraryTemplateDragStart(e, template.id)}
                            onDragEnd={handleLibraryTemplateDragEnd}
                            onClick={() => importFormationFromLibrary(template.id)}
                            className={`bg-[#2e2e2e] border border-[#3a3a3a] rounded-[8px] p-2.5 hover:bg-[#333] transition-colors cursor-grab active:cursor-grabbing ${
                              draggedLibraryFormationId === template.id ? 'opacity-60' : ''
                            }`}
                            title="Drag onto the stage to import, or click to import"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-white text-[13px] truncate">{template.formationName}</p>
                                <p className="text-[#9a9a9a] text-[11px] truncate">{template.projectTitle}</p>
                              </div>
                              <span className="text-[#8b72be] text-[11px] whitespace-nowrap">{template.duration}px</span>
                            </div>
                            <div className="mt-2 h-[72px] bg-[#1d1d1d] border border-[#3a3a3a] rounded-[6px] relative overflow-hidden">
                              {template.dancers.map((dancer, idx) => (
                                <div
                                  key={`${template.id}-${dancer.sourceDancerId}-${idx}`}
                                  className="absolute w-[9px] h-[9px] rounded-full border border-black/20"
                                  style={{
                                    left: `${Math.max(0, Math.min(100, dancer.xRatio * 100))}%`,
                                    top: `${Math.max(0, Math.min(100, dancer.yRatio * 100))}%`,
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: dancer.color
                                  }}
                                />
                              ))}
                            </div>
                            <div className="mt-2 flex justify-between text-[#888] text-[11px]">
                              <span>Drag thumbnail to stage</span>
                              <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
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
                      <div
                        key={dancer.id}
                        draggable={!selectedFormation?.dancers.some((dancerPos) => dancerPos.dancerId === dancer.id)}
                        onDragStart={(e) => handlePeopleDancerDragStart(e, dancer.id)}
                        onDragEnd={handlePeopleDancerDragEnd}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded ${
                          selectedDancerIds.has(dancer.id) ? 'bg-[#3a3550] ring-1 ring-[#8b72be]' : 'hover:bg-[#333]'
                        } ${draggedPeopleDancerId === dancer.id ? 'opacity-60' : ''} ${
                          selectedFormation?.dancers.some((dancerPos) => dancerPos.dancerId === dancer.id)
                            ? 'cursor-default'
                            : 'cursor-grab active:cursor-grabbing'
                        }`}
                        title={
                          selectedFormation?.dancers.some((dancerPos) => dancerPos.dancerId === dancer.id)
                            ? 'Already in this formation'
                            : 'Drag onto the stage to add to this formation'
                        }
                      >
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
          <div className="flex items-center gap-1 mr-1">
            <span className="text-[#999] text-[12px] uppercase tracking-wide">transition</span>
            <span className="text-[#888] text-[11px] max-w-[170px] truncate" title={selectedTransitionLabel}>
              {selectedTransitionLabel}
            </span>
            <button
              className={`w-5 h-5 rounded border text-[#999] transition-colors flex items-center justify-center ${
                selectedTransitionDividerIsValid
                  ? 'border-[#444] hover:bg-[#333]'
                  : 'border-[#333] opacity-50 cursor-not-allowed'
              }`}
              onClick={() => adjustSelectedTransitionDivider(-0.25)}
              disabled={!selectedTransitionDividerIsValid}
              title={selectedTransitionDividerIsValid ? 'Shorten selected divider transition' : 'Select a timeline divider first'}
            >
              <Minus size={10} />
            </button>
            <input
              type="number"
              min={MIN_FORMATION_TRANSITION_SECONDS}
              max={MAX_FORMATION_TRANSITION_SECONDS}
              step={0.25}
              value={selectedTransitionDividerIsValid ? selectedTransitionSeconds : ''}
              placeholder="--"
              disabled={!selectedTransitionDividerIsValid}
              onChange={(e) => {
                if (e.target.value === '') return;
                const next = Number(e.target.value);
                if (Number.isFinite(next) && selectedTransitionDividerIsValid) {
                  setTransitionForDivider(selectedTransitionDividerIndex as number, next);
                }
              }}
              className="w-[54px] bg-[#1d1d1d] border border-[#444] rounded text-[#b4b1b1] text-[12px] px-1.5 py-0.5 text-center outline-none focus:border-[#8b72be]"
              title={selectedTransitionDividerIsValid ? 'Transition seconds for selected divider' : 'Select a divider between formations'}
            />
            <span className="text-[#999] text-[12px]">s</span>
            <button
              className={`w-5 h-5 rounded border text-[#999] transition-colors flex items-center justify-center ${
                selectedTransitionDividerIsValid
                  ? 'border-[#444] hover:bg-[#333]'
                  : 'border-[#333] opacity-50 cursor-not-allowed'
              }`}
              onClick={() => adjustSelectedTransitionDivider(0.25)}
              disabled={!selectedTransitionDividerIsValid}
              title={selectedTransitionDividerIsValid ? 'Lengthen selected divider transition' : 'Select a timeline divider first'}
            >
              <Plus size={10} />
            </button>
          </div>
          {recordStatus && (
            <span className={`text-[12px] max-w-[300px] truncate ${isRecording ? 'text-[#e03535]' : 'text-[#999]'}`}>
              {recordStatus}
            </span>
          )}
          <span className="text-[#999] text-[13px] font-medium">path edit mode</span>
          <button
            onClick={() => {
              setIsPathEditMode((prev) => !prev);
              setDraggedPathHandle(null);
              setSelectedDancerIds(new Set());
            }}
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
        {isPathEditMode && (
          <div className="absolute left-6 top-6 z-20 w-[250px] bg-[#252525]/95 border border-[#3a3a3a] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <div className="px-4 py-3 border-b border-[#3a3a3a]">
              <h3 className="text-white text-[14px] font-semibold tracking-wide">Path Edit Mode</h3>
              <p className="text-[#9a9a9a] text-[12px] mt-1 leading-relaxed">
                Select one dancer on the stage to edit the path into the next formation.
              </p>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {!selectedFormationNext ? (
                <div className="text-[#8f8f8f] text-[12px] leading-relaxed">
                  Choose a formation that has a next formation to edit its transition path.
                </div>
              ) : !selectedPathEditDancer || !selectedPathEditDancerNext ? (
                <div className="text-[#8f8f8f] text-[12px] leading-relaxed">
                  Click a dancer that exists in both <span className="text-white">{selectedFormation?.name}</span> and <span className="text-white">{selectedFormationNext.name}</span>.
                </div>
              ) : (
                PATH_TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handlePathTypeChange(option.id)}
                    className={`text-left px-3 py-2.5 rounded-[10px] border transition-colors ${
                      selectedPathType === option.id
                        ? 'bg-[#3a3550] border-[#8b72be]'
                        : 'bg-[#2d2d2d] border-[#3a3a3a] hover:bg-[#333]'
                    }`}
                  >
                    <div className="text-white text-[13px] font-medium">{option.label}</div>
                    <div className="text-[#989898] text-[11px] leading-relaxed mt-1">{option.description}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

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
          <div ref={stageAreaRef} className="flex-1 flex flex-col items-center justify-center p-8 gap-6 overflow-hidden">
            {/* Formation Name Above Stage */}
            <div className="flex-shrink-0">
              <span className="text-[#b4b1b1] text-[20px] font-bold tracking-[0.52px]">{selectedFormation.name}</span>
            </div>

            {/* Stage with Notes — scaled wrapper */}
            <div
              className="flex-shrink-0 relative"
              style={{
                width: (safeStageWidth + 274) * stageScale,
                height: safeStageHeight * stageScale,
              }}
            >
              <div
                style={{
                  transform: `scale(${stageScale})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
            <div className="flex gap-6 items-start">
              <div
                ref={stageRef}
                className={`bg-[#28292a] rounded-[16px] border-[3px] relative overflow-hidden ${
                  isPathEditMode ? 'cursor-default' : 'cursor-crosshair'
                } ${
                  isStageLibraryDragOver || isStagePeopleDragOver
                    ? 'border-[#b79ef2] shadow-[inset_0_0_0_3px_rgba(139,114,190,0.35)]'
                    : 'border-[#8b72be]'
                }`}
                style={{ width: `${safeStageWidth}px`, height: `${safeStageHeight}px` }}
                onMouseDown={handleStageMouseDown}
                onDragEnter={handleStageDragEnter}
                onDragOver={handleStageDragOver}
                onDragLeave={handleStageDragLeave}
                onDrop={handleStageDrop}
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

                {isPathEditMode && selectedPathEditDancer && selectedPathEditDancerNext && selectedPathEditPath && (
                  <>
                    <svg className="absolute inset-0 pointer-events-none overflow-visible">
                      <defs>
                        <marker
                          id="path-edit-arrow"
                          markerWidth="10"
                          markerHeight="10"
                          refX="8"
                          refY="5"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d7ccf0" />
                        </marker>
                      </defs>
                      <path
                        d={getSvgPathDefinition(
                          selectedPathEditPath,
                          { x: selectedPathEditDancer.x, y: selectedPathEditDancer.y },
                          { x: selectedPathEditDancerNext.x, y: selectedPathEditDancerNext.y }
                        )}
                        stroke="#d7ccf0"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        markerEnd="url(#path-edit-arrow)"
                      />
                    </svg>

                    {selectedPathEditPath.controlPoints.map((point, index) => (
                      <button
                        key={`${selectedPathEditDancer.dancerId}-handle-${index}`}
                        type="button"
                        className="absolute w-5 h-5 rounded-full bg-white border-4 border-[#8b72be] shadow-[0_2px_10px_rgba(0,0,0,0.35)] cursor-grab active:cursor-grabbing"
                        style={{
                          left: `${point.x}px`,
                          top: `${point.y}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onMouseDown={(e) => handlePathHandleMouseDown(e, selectedPathEditDancer.dancerId, index)}
                      />
                    ))}

                    {(() => {
                      const dancerMeta = dancers.find((dancer) => dancer.id === selectedPathEditDancer.dancerId);
                      if (!dancerMeta) return null;
                      return (
                        <div
                          className="absolute w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-[18px] font-medium pointer-events-none border border-white/25"
                          style={{
                            left: `${selectedPathEditDancerNext.x}px`,
                            top: `${selectedPathEditDancerNext.y}px`,
                            transform: 'translate(-50%, -50%)',
                            opacity: 0.35,
                            backgroundColor: dancerMeta.color
                          }}
                        >
                          {getDancerInitials(dancerMeta)}
                        </div>
                      );
                    })()}
                  </>
                )}
                
                {/* Dancers */}
                {renderedStageDancers.map(({ key, dancer, dancerId, x, y, opacity, isSelected }) => (
                  <div
                    key={key}
                    className={`dancer-circle absolute w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-[18px] font-medium cursor-move select-none ${isSelected ? 'ring-4 ring-white' : ''}`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity,
                      backgroundColor: dancer.color
                    }}
                    onMouseDown={(e) => handleDancerDragStart(e, dancerId)}
                  >
                    {getDancerInitials(dancer)}
                  </div>
                ))}

                {selectionBox && (
                  <div
                    className="absolute border border-dashed border-white/80 bg-white/10 pointer-events-none"
                    style={{
                      left: `${Math.min(selectionBox.startX, selectionBox.currentX)}px`,
                      top: `${Math.min(selectionBox.startY, selectionBox.currentY)}px`,
                      width: `${Math.abs(selectionBox.currentX - selectionBox.startX)}px`,
                      height: `${Math.abs(selectionBox.currentY - selectionBox.startY)}px`
                    }}
                  />
                )}
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
              </div>
            </div>

            <div className="flex-shrink-0">
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
            {formations.map((formation, index) => {
              const leftPx = 40 + formations.slice(0, index).reduce((s, p) => s + p.duration, 0);
              const isDragged = reorderedFormation?.id === formation.id;
              const timelineRect = timelineRef.current?.getBoundingClientRect();
              const draggedLeft = isDragged && timelineRect
                ? reorderedFormation.currentX - timelineRect.left - reorderedFormation.pointerOffsetX
                : leftPx;
              const translateX = isDragged ? draggedLeft - leftPx : 0;

              const hasNextFormation = index < formations.length - 1;
              const dividerLeftPx = leftPx + formation.duration;
              const dividerSeconds = getTransitionSecondsForDivider(index);
              const isSelectedDivider = selectedDividerIndex === index;

              return (
                <div key={formation.id}>
                  <div
                    className={`absolute bg-[rgba(139,114,190,0.2)] border border-[#8b72be] rounded-[5px] flex items-center justify-center cursor-pointer ${
                      selectedFormationId === formation.id ? 'ring-2 ring-[#8b72be]' : ''
                    } ${isDragged ? 'shadow-[0_8px_24px_rgba(0,0,0,0.35)]' : ''}`}
                    style={{
                      left: `${leftPx}px`,
                      top: `calc(50% - ${TIMELINE_BLOCK_HEIGHT / 2}px)`,
                      width: `${formation.duration}px`,
                      height: `${TIMELINE_BLOCK_HEIGHT}px`,
                      transform: `translateX(${translateX}px)`,
                      zIndex: isDragged ? 15 : 1,
                      opacity: isDragged ? 0.92 : 1
                    }}
                    onMouseDown={(e) => handleFormationReorderStart(e, formation.id)}
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

                  {hasNextFormation && (
                    <>
                      <div
                        className={`absolute top-[calc(50%-26px)] h-[52px] w-[2px] pointer-events-none ${
                          isSelectedDivider ? 'bg-[#e0d6ff]' : 'bg-[#8b72be]'
                        }`}
                        style={{ left: `${dividerLeftPx}px`, zIndex: 18, opacity: isSelectedDivider ? 1 : 0.75 }}
                      />
                      <button
                        className={`absolute -translate-x-1/2 h-[18px] min-w-[34px] px-1 rounded text-[10px] font-medium border transition-colors ${
                          isSelectedDivider
                            ? 'bg-[#8b72be] border-[#d8ccff] text-white'
                            : 'bg-[#2a2a2a] border-[#4a3f67] text-[#cbbcf0] hover:bg-[#3a3350]'
                        }`}
                        style={{
                          left: `${dividerLeftPx}px`,
                          top: `calc(50% + ${TIMELINE_BLOCK_HEIGHT / 2 + 5}px)`,
                          zIndex: 19
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTransitionDividerIndex(index);
                        }}
                        title={`Set transition between ${formation.name} and ${formations[index + 1].name}`}
                      >
                        {formatTransitionSeconds(dividerSeconds)}s
                      </button>
                    </>
                  )}
                </div>
              );
            })}
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
                  onClick={() => { stopPlayback(); setPlayheadTime(0); setAudioFile(null); setAudioDuration(null); audioBufferRef.current = null; audioDataRef.current = null; }}
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
                  <li>Click a divider badge between two formation blocks (for example <span className="text-white font-medium">1s</span>), then use the top-bar <span className="text-white font-medium">transition</span> controls to set that specific transition time (for example, 5s).</li>
                  <li>You can also drag a formation block&apos;s right edge in the timeline to resize its duration.</li>
                  <li>Use the top-right <span className="text-white font-medium">Settings</span> button to change stage size, ratio, and grid lines.</li>
                  <li>Use the <span className="text-white font-medium">Search</span> button to browse formation thumbnails from previous projects by dancer count, then drag a thumbnail to the stage to import it.</li>
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
