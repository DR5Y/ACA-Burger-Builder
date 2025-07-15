import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, ChefHat } from 'lucide-react'; //importing icons from lucide
import './App.css';

// Individual component classes for the burger
class BurgerComponent {
  constructor(id, name, color, textColor = 'white') {
    this.id = id;
    this.name = name;
    this.color = color;
    this.textColor = textColor;
  }
}

// Define available burger components
const availableComponents = {
  topBread: new BurgerComponent('topBread', 'Top Bread', '#D4A574', 'black'),
  tomato: new BurgerComponent('tomato', 'Tomato', '#FF4444'),
  meat: new BurgerComponent('meat', 'Meat', '#8B4513'),
  lettuce: new BurgerComponent('lettuce', 'Lettuce', '#228B22'),
  baseBread: new BurgerComponent('baseBread', 'Base Bread', '#D4A574', 'black')
};

// Individual component display with buttons
const ComponentLayer = ({ component, onRemove, index, canRemove }) => (
  <div 
    className="component-layer"
    style={{
      backgroundColor: component.color,
      color: component.textColor,
    }}
  >
    {component.name}
    {canRemove && (
      <button
        onClick={() => onRemove(index)}
        className="remove-button"
      >
        <Minus size={14} />
      </button>
    )}
  </div>
);

// Main burger builder component
const BurgerBuilder = () => {
  const [burgerStack, setBurgerStack] = useState([
    availableComponents.topBread,
    availableComponents.lettuce,
    availableComponents.tomato,
    availableComponents.meat,
    availableComponents.baseBread
  ]);

  const addComponent = (componentKey) => {
    const component = availableComponents[componentKey];
    if (componentKey === 'topBread') {
      setBurgerStack([component, ...burgerStack.slice(1)]);
    } else if (componentKey === 'baseBread') {
      setBurgerStack([...burgerStack.slice(0, -1), component]);
    } else {
      // Add other components in the middle (before the base bread)
      const newStack = [...burgerStack];
      newStack.splice(-1, 0, component);
      setBurgerStack(newStack);
    }
  };

  const removeComponent = (index) => {
    // Don't allow removal of top or base bread
    if (index === 0 || index === burgerStack.length - 1) return;
    
    const newStack = burgerStack.filter((_, i) => i !== index);
    setBurgerStack(newStack);
  };

  const resetBurger = () => {
    setBurgerStack([
      availableComponents.topBread,
      availableComponents.lettuce,
      availableComponents.tomato,
      availableComponents.meat,
      availableComponents.baseBread
    ]);
  };

  const getComponentCount = (componentName) => {
    return burgerStack.filter(comp => comp.name === componentName).length;
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-title">
            <ChefHat className="chef-icon" size={40} />
            <h1>ACA Burger Builder</h1>
          </div>
          <p className="header-subtitle">Create your perfect burger by adding and removing components!</p>
        </div>

        <div className="content-grid">
          {/* Burger Display */}
          <div className="burger-display">
            <h2>Your Burger</h2>
            <div className="burger-container">
              <div className="burger-stack">
                {burgerStack.map((component, index) => (
                  <ComponentLayer
                    key={`${component.id}-${index}`}
                    component={component}
                    onRemove={removeComponent}
                    index={index}
                    canRemove={index !== 0 && index !== burgerStack.length - 1}
                  />
                ))}
              </div>
            </div>
            
            {/* Burger Stats */}
            <div className="burger-stats">
              <div className="stats-container">
                <h3>Burger Components:</h3>
                <div className="stats-list">
                  {Object.values(availableComponents).map(comp => {
                    const count = getComponentCount(comp.name);
                    return count > 0 ? (
                      <div key={comp.id} className="stat-item">
                        <span>{comp.name}:</span>
                        <span className="stat-count">{count}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="control-panel">
            <h2>Add Components</h2>
            
            <div className="component-buttons">
              {Object.entries(availableComponents).map(([key, component]) => (
                <div key={key} className="component-button-row">
                  <div className="component-info">
                    <div 
                      className="component-color-box"
                      style={{ backgroundColor: component.color }}
                    ></div>
                    <span className="component-name">{component.name}</span>
                    <span className="component-count">({getComponentCount(component.name)})</span>
                  </div>
                  <button
                    onClick={() => addComponent(key)}
                    className="add-button"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              ))}
            </div>

            <div className="reset-section">
              <button
                onClick={resetBurger}
                className="reset-button"
              >
                <RotateCcw size={18} />
                Reset Burger
              </button>
            </div>

            {/* Instructions */}
            <div className="instructions">
              <h3>Instructions:</h3>
              <ul>
                <li>• Click "Add" to add components to your burger</li>
                <li>• Hover over components and click the minus button to remove them</li>
                <li>• Top and base bread cannot be removed</li>
                <li>• Other components are added in the middle layers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerBuilder;