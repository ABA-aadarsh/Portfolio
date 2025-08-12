// src/scripts/InteractiveCat.ts

interface CatPosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  width: number;
  height: number;
  scale: number;
  facingRight: boolean;
  speed: number;
}

interface CatBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

type CatState = 
  | 'sitting' 
  | 'looking-right' 
  | 'licking' 
  | 'washing' 
  | 'walking' 
  | 'running' 
  | 'sleeping' 
  | 'joyful' 
  | 'jumping' 
  | 'hissing';

type AnimationMap = Record<CatState, number>;
type StateRowMap = Record<CatState, number>;

export class InteractiveCat {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cat: CatPosition;
  private currentState: CatState;
  private currentFrame: number;
  private frameTimer: number;
  private frameDelay: number;
  private isMoving: boolean;
  private isInteracting: boolean;
  private lastInteraction: number;
  private animations: AnimationMap;
  private stateRows: StateRowMap;
  private spriteImage: HTMLImageElement;
  private randomBehaviorInterval: number;
  private gameLoopId: number;

  constructor() {
    const canvas = document.getElementById('cat-canvas') as HTMLCanvasElement;
    if (!canvas) throw new Error('Canvas element not found');
    
    this.canvas = canvas;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Canvas context not available');
    
    this.ctx = context;
    
    // Set fixed canvas size for easter egg
    this.canvas.width = 760;
    this.canvas.height = 180;
    
    // Cat properties - adjusted for smaller canvas
    this.cat = {
      x: -32,
      y: this.canvas.height - 70, // Fixed Y position
      targetX: -32,
      targetY: this.canvas.height - 70, // Fixed Y position
      width: 32,
      height: 32,
      scale: 2.2, // Larger scale for better visibility
      facingRight: true,
      speed: 2 // Slightly faster for responsiveness
    };
    
    // Animation properties
    this.currentState = 'sitting';
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.frameDelay = 10; // Slightly slower animation for calmer feel
    
    // State management
    this.isMoving = false;
    this.isInteracting = false;
    this.lastInteraction = Date.now();
    this.randomBehaviorInterval = 0;
    this.gameLoopId = 0;
    
    // Animation frame counts
    this.animations = {
      sitting: 4,
      'looking-right': 4,
      licking: 4,
      washing: 4,
      walking: 8,
      running: 8,
      sleeping: 4,
      joyful: 6,
      jumping: 7,
      hissing: 8
    };
    
    // Row mapping for sprite sheet
    this.stateRows = {
      sitting: 0,
      'looking-right': 1,
      licking: 2,
      washing: 3,
      walking: 4,
      running: 5,
      sleeping: 6,
      joyful: 7,
      jumping: 8,
      hissing: 9
    };
    
    this.spriteImage = new Image();
    this.init();
  }

  private updateCanvasSize(): void {
    // Get the computed size from CSS
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  private calculateScale(): number {
    // Scale based on canvas width - larger on mobile for better visibility
    const baseScale = this.canvas.width / 560; // 560 is base desktop width
    return Math.max(1.8, Math.min(3.5, baseScale * 2.2)); // Scale between 1.8 and 3.5
  }

  private calculateSpeed(): number {
    // Speed proportional to canvas size
    const baseSpeed = this.canvas.width / 560;
    return Math.max(1.5, baseSpeed * 2);
  }

  private updateCatPosition(): void {
    const yPosition = this.canvas.height - (this.cat.height * this.cat.scale) - 10;
    this.cat.y = yPosition;
    this.cat.targetY = yPosition;
  }
  
  private async init(): Promise<void> {
    this.spriteImage.onload = (): void => {
      this.enterFromLeft();
      this.startGameLoop();
    };
    
    this.spriteImage.onerror = (): void => {
      console.error('Failed to load sprite image');
    };
    
    // Replace with your actual sprite path
    this.spriteImage.src = "/assets/sprite.png"
    
    // Event listeners
    this.canvas.addEventListener('click', (e: MouseEvent) => this.handleClick(e));
    this.canvas.addEventListener('touchstart', (e: TouchEvent) => this.handleTouch(e));
    window.addEventListener('resize', () => this.handleResize());
    
    this.startRandomBehavior();
  }
  
  private enterFromLeft(): void {
    this.setState('walking');
    this.cat.facingRight = true;
    // Enter to about 15% of canvas width
    this.moveTo(this.canvas.width * 0.15, this.cat.y);
    
    setTimeout(() => {
      if (!this.isMoving) {
        this.setState('sitting');
      }
    }, 2000);
  }
  
  private setState(newState: CatState): void {
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.currentFrame = 0;
      this.frameTimer = 0;
    }
  }
  
  private moveTo(targetX: number, targetY: number): void {
    // Only allow horizontal movement, keep Y fixed
    this.cat.targetX = Math.max(0, Math.min(targetX, this.canvas.width - this.cat.width * this.cat.scale));
    this.cat.targetY = this.cat.y; // Keep Y position fixed
    
    if (this.cat.targetX > this.cat.x) {
      this.cat.facingRight = true;
    } else if (this.cat.targetX < this.cat.x) {
      this.cat.facingRight = false;
    }
    
    this.isMoving = true;
    
    const distance = Math.abs(this.cat.targetX - this.cat.x); // Only horizontal distance
    
    // Dynamic distance thresholds based on canvas size
    const runThreshold = this.canvas.width * 0.15; // 15% of canvas width
    const walkThreshold = this.canvas.width * 0.01; // 1% of canvas width
    
    if (distance > runThreshold) {
      this.setState('running');
    } else if (distance > walkThreshold) {
      this.setState('walking');
    } else {
      this.isMoving = false;
      this.setState('sitting');
    }
  }
  
  private update(): void {
    if (this.isMoving) {
      const dx = this.cat.targetX - this.cat.x;
      const distance = Math.abs(dx); // Only horizontal distance
      
      if (distance <= this.cat.speed) {
        // Reached target
        this.cat.x = this.cat.targetX;
        this.isMoving = false;
        
        setTimeout(() => {
          if (!this.isMoving && !this.isInteracting) {
            this.setState('sitting');
          }
        }, 200);
      } else {
        // Move horizontally towards target
        this.cat.x += dx > 0 ? this.cat.speed : -this.cat.speed;
      }
    }
    
    this.frameTimer++;
    if (this.frameTimer >= this.frameDelay) {
      this.frameTimer = 0;
      this.currentFrame = (this.currentFrame + 1) % this.animations[this.currentState];
    }
  }
  
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.spriteImage.complete) {
      const sourceX = this.currentFrame * 32;
      const sourceY = this.stateRows[this.currentState] * 32;
      
      this.ctx.save();
      
      if (!this.cat.facingRight) {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.spriteImage,
          sourceX, sourceY, 32, 32,
          -(this.cat.x + this.cat.width * this.cat.scale), this.cat.y,
          this.cat.width * this.cat.scale, this.cat.height * this.cat.scale
        );
      } else {
        this.ctx.drawImage(
          this.spriteImage,
          sourceX, sourceY, 32, 32,
          this.cat.x, this.cat.y,
          this.cat.width * this.cat.scale, this.cat.height * this.cat.scale
        );
      }
      
      this.ctx.restore();
    }
  }
  
  private startGameLoop(): void {
    const gameLoop = (): void => {
      this.update();
      this.draw();
      this.gameLoopId = requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }
  
  private startRandomBehavior(): void {
    this.randomBehaviorInterval = window.setInterval(() => {
      if (!this.isMoving && !this.isInteracting && Date.now() - this.lastInteraction > 3000) {
        const behaviors: CatState[] = ['licking', 'washing', 'looking-right', 'sitting', 'sleeping'];
        const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
        
        this.setState(randomBehavior);
        this.isInteracting = true;
        
        setTimeout(() => {
          this.isInteracting = false;
          this.setState('sitting');
        }, 2000 + Math.random() * 3000);
      }
    }, 4000 + Math.random() * 4000); // More frequent behaviors for easter egg
  }
  
  private handleClick(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const catBounds: CatBounds = {
      left: this.cat.x,
      right: this.cat.x + (this.cat.width * this.cat.scale),
      top: this.cat.y,
      bottom: this.cat.y + (this.cat.height * this.cat.scale)
    };
    
    if (clickX >= catBounds.left && clickX <= catBounds.right &&
        clickY >= catBounds.top && clickY <= catBounds.bottom) {
      this.handleCatClick();
    } else {
      this.handleEnvironmentClick(clickX, clickY);
    }
    
    this.lastInteraction = Date.now();
  }
  
  private handleCatClick(): void {
    const reactions: CatState[] = ['joyful', 'jumping', 'hissing']; // Added joyful for more variety
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    
    this.setState(reaction);
    this.isInteracting = true;
    
    if (reaction === 'jumping') {
      const originalY = this.cat.y;
      this.cat.y -= 20; // Slightly bigger jump with larger scale
      setTimeout(() => {
        this.cat.y = originalY;
      }, 300);
    }
    
    setTimeout(() => {
      this.isInteracting = false;
      this.setState('sitting');
    }, 1500);
  }
  
  private handleEnvironmentClick(clickX: number, clickY: number): void {
    const catCenterX = this.cat.x + (this.cat.width * this.cat.scale / 2);
    const distance = Math.abs(clickX - catCenterX); // Only horizontal distance
    
    // Only move if click is far enough horizontally
    if (distance > 40) {
      this.moveTo(clickX - this.cat.width * this.cat.scale / 2, this.cat.y);
    } else {
      // Just turn to face the click direction
      this.cat.facingRight = clickX > catCenterX;
      this.setState('looking-right');
      this.isInteracting = true;
      
      setTimeout(() => {
        this.isInteracting = false;
        this.setState('sitting');
      }, 1500);
    }
  }
  
  private handleTouch(e: TouchEvent): void {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const touchEvent: MouseEvent = new MouseEvent('click', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    
    this.handleClick(touchEvent);
  }

  public destroy(): void {
    if (this.randomBehaviorInterval) {
      clearInterval(this.randomBehaviorInterval);
    }
    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
    }
    
    this.canvas.removeEventListener('click', this.handleClick);
    this.canvas.removeEventListener('touchstart', this.handleTouch);
    window.removeEventListener('resize', this.handleResize);
  }

  private handleResize(): void {
    // Update canvas size based on CSS
    this.updateCanvasSize();
    
    // Recalculate cat properties
    const newScale = this.calculateScale();
    const newSpeed = this.calculateSpeed();
    
    // Update cat properties if they've changed significantly
    if (Math.abs(this.cat.scale - newScale) > 0.2) {
      this.cat.scale = newScale;
      this.cat.speed = newSpeed;
      this.updateCatPosition();
      
      // Ensure cat stays within bounds
      this.cat.x = Math.min(this.cat.x, this.canvas.width - this.cat.width * this.cat.scale);
      this.cat.targetX = Math.min(this.cat.targetX, this.canvas.width - this.cat.width * this.cat.scale);
    }
  }
}