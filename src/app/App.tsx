import { useState, useRef, useEffect } from 'react';
import { Settings, Search, Play, User, Plus, ChevronRight, Minus, X, Home, Trash2, Bold, Italic, Underline } from 'lucide-react';

interface Dancer {
  id: string;
  name: string;
  number: number;
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

export default function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPathEditMode, setIsPathEditMode] = useState(false);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedFormationId, setSelectedFormationId] = useState<string | null>(null);
  const [editingFormationId, setEditingFormationId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [draggedFormation, setDraggedFormation] = useState<{ id: string; startX: number; startDuration: number } | null>(null);
  
  const [dancers, setDancers] = useState<Dancer[]>([]);
  const [selectedDancerIds, setSelectedDancerIds] = useState<Set<string>>(new Set());
  const [draggedDancer, setDraggedDancer] = useState<{ dancerId: string; offsetX: number; offsetY: number } | null>(null);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [editingDancerId, setEditingDancerId] = useState<string | null>(null);
  const [removalDialog, setRemovalDialog] = useState<{ dancerId: string; dancerName: string } | null>(null);
  
  const [projectTitle, setProjectTitle] = useState('Hip Hop Piece Formations');
  const [editingProjectTitle, setEditingProjectTitle] = useState(false);
  
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; formationId: string } | null>(null);
  const [formationShifts, setFormationShifts] = useState<Record<string, number>>({});
  
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const peopleDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const selectedFormation = formations.find(f => f.id === selectedFormationId);

  // Get unique dancer counts from all formations
  const uniqueDancerCounts = Array.from(
    new Set(formations.map(f => f.dancers.length))
  ).sort((a, b) => b - a); // Sort descending

  const createNewFormation = () => {
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create new dancer
    const newDancer: Dancer = {
      id: `dancer-${Date.now()}`,
      name: `${dancers.length + 1}`,
      number: dancers.length + 1
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
    setDraggedDancer({ dancerId, offsetX, offsetY });
  };

  const handleDancerDragMove = (e: MouseEvent) => {
    if (!draggedDancer || !stageRef.current || !selectedFormationId) return;
    
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - draggedDancer.offsetX;
    const y = e.clientY - rect.top - draggedDancer.offsetY;
    
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

  const handleDancerClickInDropdown = (dancerId: string) => {
    if (!selectedFormationId || !stageRef.current) return;
    
    // Check if dancer already exists in current formation
    const dancerExists = selectedFormation?.dancers.some(d => d.dancerId === dancerId);
    
    if (!dancerExists) {
      // Add dancer to center of stage
      const centerX = 400;
      const centerY = 250;
      
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
      // Remove from all formations
      setFormations(formations.map(f => ({
        ...f,
        dancers: f.dancers.filter(d => d.dancerId !== removalDialog.dancerId)
      })));
      // Remove from dancers list
      setDancers(dancers.filter(d => d.id !== removalDialog.dancerId));
    } else if (option === 'this' && selectedFormationId) {
      // Remove from current formation only
      setFormations(formations.map(f => {
        if (f.id === selectedFormationId) {
          return {
            ...f,
            dancers: f.dancers.filter(d => d.dancerId !== removalDialog.dancerId)
          };
        }
        return f;
      }));
    }
    
    setRemovalDialog(null);
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

  const handleDeleteFormation = (formationId: string) => {
    const deletedIndex = formations.findIndex(f => f.id === formationId);
    const newFormations = formations.filter(f => f.id !== formationId);
    
    // Recalculate shifts after deletion
    const newShifts = { ...formationShifts };
    delete newShifts[formationId];
    
    // If not the last formation, recalculate shifts for all subsequent formations
    if (deletedIndex < formations.length - 1) {
      // Remove all shifts for formations after the deleted one and recalculate
      for (let i = deletedIndex; i < newFormations.length; i++) {
        delete newShifts[newFormations[i].id];
      }
      
      // Recalculate shifts based on actual positions
      const prevFormation = deletedIndex > 0 ? newFormations[deletedIndex - 1] : null;
      if (prevFormation) {
        const prevLeft = 40 + (deletedIndex - 1) * 180 + (formationShifts[prevFormation.id] || 0);
        const prevRight = prevLeft + prevFormation.duration;
        
        for (let i = deletedIndex; i < newFormations.length; i++) {
          const currentLeft = 40 + i * 180;
          const neededShift = Math.max(0, prevRight - currentLeft);
          if (neededShift > 0) {
            newShifts[newFormations[i].id] = neededShift;
          }
        }
      }
    }
    
    setFormations(newFormations);
    setFormationShifts(newShifts);
    
    if (selectedFormationId === formationId) {
      // Select another formation if available
      const remainingFormations = newFormations;
      setSelectedFormationId(remainingFormations.length > 0 ? remainingFormations[0].id : null);
    }
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

  const handleResizeStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const formation = formations.find(f => f.id === id);
    if (formation) {
      setDraggedFormation({
        id,
        startX: e.clientX,
        startDuration: formation.duration
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggedFormation && timelineRef.current) {
      const deltaX = e.clientX - draggedFormation.startX;
      const newDuration = Math.max(50, draggedFormation.startDuration + deltaX);
      
      // Find the index of the dragged formation
      const draggedIndex = formations.findIndex(f => f.id === draggedFormation.id);
      if (draggedIndex === -1) return;
      
      // Calculate the right edge of the dragged formation
      const draggedLeft = 40 + draggedIndex * 180;
      const draggedRight = draggedLeft + newDuration;
      
      const newShifts = { ...formationShifts };
      
      // Check for overlaps with formations to the right and calculate shifts
      let cumulativeShift = 0;
      for (let i = draggedIndex + 1; i < formations.length; i++) {
        const nextLeft = 40 + i * 180 + (newShifts[formations[i].id] || 0);
        
        // If the dragged formation overlaps with this one, push it
        if (draggedRight > nextLeft) {
          const overlap = draggedRight - nextLeft;
          cumulativeShift += overlap;
          newShifts[formations[i].id] = (newShifts[formations[i].id] || 0) + overlap;
        }
      }
      
      // If shrinking, try to reduce shifts (pull formations closer)
      if (deltaX < 0 && formations.length > draggedIndex + 1) {
        // Recalculate shifts from scratch based on new duration
        const recalculatedShifts: Record<string, number> = {};
        const newDraggedRight = draggedLeft + newDuration;
        
        for (let i = draggedIndex + 1; i < formations.length; i++) {
          const prevFormationId = i === draggedIndex + 1 ? draggedFormation.id : formations[i - 1].id;
          const prevRight = i === draggedIndex + 1 
            ? newDraggedRight 
            : 40 + (i - 1) * 180 + formations[i - 1].duration + (recalculatedShifts[prevFormationId] || 0);
          
          const currentLeft = 40 + i * 180;
          const neededShift = Math.max(0, prevRight - currentLeft);
          
          if (neededShift > 0) {
            recalculatedShifts[formations[i].id] = neededShift;
          }
        }
        
        // Merge with existing shifts for formations beyond the affected ones
        const mergedShifts = { ...formationShifts, ...recalculatedShifts };
        // Remove shifts that are no longer needed
        for (let i = draggedIndex + 1; i < formations.length; i++) {
          if (!recalculatedShifts[formations[i].id]) {
            delete mergedShifts[formations[i].id];
          }
        }
        
        setFormations(formations.map(f => 
          f.id === draggedFormation.id ? { ...f, duration: newDuration } : f
        ));
        setFormationShifts(mergedShifts);
        return;
      }
      
      // Update the dragged formation's duration and shifts
      setFormations(formations.map(f => 
        f.id === draggedFormation.id ? { ...f, duration: newDuration } : f
      ));
      setFormationShifts(newShifts);
    }
  };

  const handleMouseUp = () => {
    // Commit the shifts by updating formation start times if needed
    // For now, we keep the shifts persistent until formations are rearranged
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
        setEditingDancerId(null);
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
        <button className="absolute right-6 text-white hover:opacity-80 transition-opacity">
          <Settings size={24} />
        </button>
      </div>

      {/* Secondary Bar with Controls */}
      <div className="h-[56px] border-b border-[#252525] flex items-center justify-between px-4">
        {/* Left: Icon Buttons */}
        <div className="flex gap-2">
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
          <button className="w-[44px] h-[40px] bg-[#2a2a2a] rounded-[10px] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333] transition-colors">
            <div className="w-[14px] h-[14px] bg-[#e03535] rounded-[7px]" />
          </button>
          <button className="w-[44px] h-[40px] bg-[#2a2a2a] rounded-[10px] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333] transition-colors">
            <Play size={17} className="text-[#888888]" fill="#888888" />
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
                className="absolute top-[calc(100%+4px)] left-0 bg-[#2a2a2a] border border-[#3a3a3a] rounded-[8px] shadow-lg z-50 min-w-[200px]"
              >
                <div className="p-2">
                  {dancers.length === 0 ? (
                    <div className="px-3 py-2 text-[#666] text-[13px]">No dancers yet</div>
                  ) : (
                    dancers.map(dancer => (
                      <div key={dancer.id} className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#333] rounded">
                        {editingDancerId === dancer.id ? (
                          <input
                            autoFocus
                            type="text"
                            className="flex-1 bg-[#1d1d1d] text-white text-[13px] px-2 py-1 rounded outline-none"
                            value={dancer.name}
                            onChange={(e) => handleDancerNameChange(dancer.id, e.target.value)}
                            onBlur={() => setEditingDancerId(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') setEditingDancerId(null);
                            }}
                          />
                        ) : (
                          <div 
                            className="flex-1 text-white text-[13px] cursor-pointer"
                            onDoubleClick={() => setEditingDancerId(dancer.id)}
                            onClick={() => handleDancerClickInDropdown(dancer.id)}
                          >
                            {dancer.name}
                          </div>
                        )}
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
                onClick={() => setSelectedFormationId(formation.id)}
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
                        className="absolute w-[18px] h-[18px] bg-[#8b72be] rounded-full flex items-center justify-center text-white text-[8px] font-medium"
                        style={{
                          left: `${(dancerPos.x / 800) * 100}%`,
                          top: `${(dancerPos.y / 500) * 100}%`,
                          transform: 'translate(-50%, -50%)'
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
                style={{ width: '800px', height: '500px' }}
                onClick={handleStageClick}
              >
                {/* Vertical gridlines */}
                {[1, 2, 3, 4, 5].map((line) => (
                  <div
                    key={`v-${line}`}
                    className="absolute top-0 bottom-0 w-px bg-[#3a3a3a] pointer-events-none"
                    style={{ left: `${(line / 6) * 100}%` }}
                  />
                ))}
                {/* Horizontal gridlines */}
                {[1, 2, 3].map((line) => (
                  <div
                    key={`h-${line}`}
                    className="absolute left-0 right-0 h-px bg-[#3a3a3a] pointer-events-none"
                    style={{ top: `${(line / 4) * 100}%` }}
                  />
                ))}
                
                {/* Dancers */}
                {selectedFormation.dancers.map(dancerPos => {
                  const dancer = dancers.find(d => d.id === dancerPos.dancerId);
                  if (!dancer) return null;
                  const isSelected = selectedDancerIds.has(dancer.id);
                  
                  return (
                    <div
                      key={dancerPos.dancerId}
                      className={`dancer-circle absolute w-[50px] h-[50px] bg-[#8b72be] rounded-full flex items-center justify-center text-white text-[18px] font-medium cursor-move select-none ${
                        isSelected ? 'ring-4 ring-white' : ''
                      }`}
                      style={{
                        left: `${dancerPos.x}px`,
                        top: `${dancerPos.y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={(e) => handleDancerClick(e, dancer.id)}
                      onMouseDown={(e) => handleDancerDragStart(e, dancer.id, dancerPos.x, dancerPos.y)}
                    >
                      {getDancerInitials(dancer)}
                    </div>
                  );
                })}
              </div>

              {/* Notes Box */}
              <div 
                className="bg-[#28292a] rounded-[16px] w-[250px] h-[500px] p-4 cursor-text"
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
          {/* Time markers */}
          <div className="absolute top-0 left-0 right-0 h-full flex pointer-events-none">
            {[10, 20, 30, 40, 50].map((time) => (
              <div key={time} className="flex-1 relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-2 top-2">
                  <span className="text-[#b4b1b1] text-[15px]">00:{time.toString().padStart(2, '0')}</span>
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
                  left: `${40 + index * 180 + (formationShifts[formation.id] || 0)}px`,
                  width: `${formation.duration}px`
                }}
                onClick={() => setSelectedFormationId(formation.id)}
                onDoubleClick={() => handleFormationDoubleClick(formation.id)}
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
            <button className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#2a2a2a] border border-[#3a3a3a] rounded flex items-center justify-center hover:bg-[#333] transition-colors">
              <Plus size={16} className="text-[#888]" />
            </button>
          </div>
        </div>
      </div>

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

      {/* Context Menu */}
      {contextMenu && (
        <div className="fixed bg-[#2a2a2a] border border-[#3a3a3a] rounded-[8px] shadow-lg z-50" style={{ left: contextMenu.x, top: contextMenu.y }}>
          <button
            className="w-full px-4 py-2 text-white hover:bg-[#333] transition-colors"
            onClick={() => handleDeleteFormation(contextMenu.formationId)}
          >
            Delete Formation
          </button>
        </div>
      )}
    </div>
  );
}