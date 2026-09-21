/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  3D OBJECT GALLERY CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * HOW TO ADD YOUR OWN 3D FILE:
 * 1. Place your .glb file inside the "public/models/" folder.
 *    (e.g., public/models/my-villa.glb)
 *
 * 2. Set "modelUrl" to its path: '/models/my-villa.glb'
 *
 * If "modelUrl" is empty (''), an elegant dark placeholder slot will be shown
 * with a live click-to-load / drag-and-drop button for you to test in browser!
 */

export const THREE_D_MODELS = [
  {
    id: 'model-1',
    title: 'Architectural Spatial Form',
    category: 'Architecture',
    modelUrl: '/models/sample-model.glb',
    location: 'Basel, Switzerland',
    year: '2026',
    description: 'Sculptural spatial exploration showcasing dynamic form, ambient occlusion, and realtime shadow depth.',
    tags: ['Architecture', 'Interactive', 'Spatial Study'],
  },
  {
    id: 'model-2',
    title: 'Modern Villa Exterior',
    category: 'Architecture',
    modelUrl: '/models/ArcherArmChair.glb',
    location: 'Lake Como, Italy',
    year: '2026',
    description: 'Contemporary residential visualization featuring cantilevered geometry and outdoor-indoor spatial flow.',
    tags: ['Exterior', 'Residential', 'Concept'],
  },
  {
    id: 'model-3',
    title: 'Minimalist Penthouse Living',
    category: 'Interior',
    modelUrl: '',
    location: 'London, United Kingdom',
    year: '2025',
    description: 'High-end interior environment rendering with tailored architectural finishes and subtle ambient mood.',
    tags: ['Interior', 'Living Space', 'Private Residence'],
  },
  {
    id: 'model-4',
    title: 'Bespoke Lounge Pavilion',
    category: 'Furniture & Product',
    modelUrl: '',
    location: 'Milan, Italy',
    year: '2026',
    description: 'Sculptural furniture study focusing on organic curve ergonomics and tactile micro-surface details.',
    tags: ['Furniture', 'Product Design', 'Prototype'],
  },
  {
    id: 'model-5',
    title: 'Parametric Timber Pavilion',
    category: 'Architecture',
    modelUrl: '',
    location: 'Kyoto, Japan',
    year: '2026',
    description: 'Complex algorithmic timber lattice structure designed for fluid solar shading and natural ventilation.',
    tags: ['Parametric', 'Timber', 'Cultural'],
  },
  {
    id: 'model-6',
    title: 'Commercial Tower Concept',
    category: 'Real Estate',
    modelUrl: '',
    location: 'Dubai, UAE',
    year: '2027',
    description: 'Iconic vertical masterplan with crystalline curtain wall glazing and aerodynamically curved crown.',
    tags: ['Commercial', 'Skyscraper', 'Masterplan'],
  },
];
