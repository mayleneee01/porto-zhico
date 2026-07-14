'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { reorderItems } from '@/app/admin/actions';
import { GripVertical } from 'lucide-react';

interface DraggableListProps<T extends { id: string; order: number }> {
  items: T[];
  model: 'Experience' | 'Project' | 'Certification' | 'Skill';
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function DraggableList<T extends { id: string; order: number }>({
  items: initialItems,
  model,
  renderItem,
}: DraggableListProps<T>) {
  const [items, setItems] = useState(initialItems);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);

    // Update optimistic state
    setItems(newItems);
    setIsSaving(true);

    try {
      // Create ordered list of IDs and their new order index
      const orderedUpdates = newItems.map((item, index) => ({
        id: item.id,
        order: index,
      }));
      
      await reorderItems(model, orderedUpdates);
    } catch (error) {
      console.error('Failed to save order', error);
      // Revert on failure
      setItems(initialItems);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={`${model}-list`}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-4 ${isSaving ? 'opacity-70 pointer-events-none' : ''}`}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`flex items-start gap-2 ${snapshot.isDragging ? 'z-50' : ''}`}
                  >
                    <div 
                      {...provided.dragHandleProps} 
                      className="mt-4 p-2 text-gray-500 hover:text-white cursor-grab active:cursor-grabbing rounded hover:bg-white/10 transition-colors"
                    >
                      <GripVertical size={20} />
                    </div>
                    <div className="flex-grow">
                      {renderItem(item, index)}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {items.length === 0 && <p className="text-gray-500">No entries found.</p>}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
