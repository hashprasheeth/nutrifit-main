import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from matplotlib.path import Path
from matplotlib.colors import LinearSegmentedColormap

# Set up the figure with a white background
plt.figure(figsize=(12, 8))
ax = plt.gca()
ax.set_facecolor('white')

# Create custom color palette for NutriFit
nutrifit_green = '#4CAF50'
nutrifit_blue = '#2196F3'
nutrifit_light_blue = '#BBDEFB'
nutrifit_light_green = '#C8E6C9'

# Draw the main outer box with a subtle border
outer_box = patches.Rectangle((0.05, 0.05), 0.9, 0.9, fill=False, linewidth=1.5, 
                             edgecolor='gray', linestyle='-')
ax.add_patch(outer_box)

# Title at the top with NutriFit branding
plt.text(0.06, 0.96, 'NutriFit - Sprint 2 Architecture', fontsize=14, 
         fontweight='bold', color=nutrifit_green)

# User Browser box
browser_box = patches.Rectangle((0.4, 0.85), 0.2, 0.08, fill=True, 
                              linewidth=1, edgecolor='gray', facecolor='white')
ax.add_patch(browser_box)
plt.text(0.5, 0.89, 'User Browser', fontsize=10, ha='center', fontweight='bold')

# HTTP arrow from browser to visualization service
plt.arrow(0.5, 0.85, 0, -0.1, head_width=0.01, head_length=0.02, 
         fc=nutrifit_blue, ec=nutrifit_blue, linewidth=1.5)
plt.text(0.51, 0.8, 'HTTP/HTTPS', fontsize=8, color=nutrifit_blue)

# Microservices label
plt.text(0.26, 0.76, 'Microservices', fontsize=12, fontweight='bold', color=nutrifit_green)

# Draw the microservices container with a light background
microservices_box = patches.Rectangle((0.1, 0.15), 0.8, 0.6, fill=True, 
                                   linewidth=1.5, edgecolor='gray', 
                                   facecolor='#F5F5F5', alpha=0.5)
ax.add_patch(microservices_box)

# Implements box on left with slight gradient
implements_box = patches.Rectangle((0.11, 0.55), 0.19, 0.12, fill=True, 
                                linewidth=1, edgecolor='gray', 
                                facecolor=nutrifit_light_green, alpha=0.7)
ax.add_patch(implements_box)
plt.text(0.12, 0.65, 'Implements:', fontsize=9, fontweight='bold')
plt.text(0.12, 0.62, '- Registration/Login/PasswordReset', fontsize=8)
plt.text(0.12, 0.59, '- UserDashboard & Nutrition Tracking', fontsize=8)
plt.text(0.12, 0.56, '- Analytics & Recommendations', fontsize=8)

# Visualization Service box
vis_box = patches.Rectangle((0.35, 0.65), 0.3, 0.08, fill=True, 
                         linewidth=1, edgecolor='gray', facecolor=nutrifit_light_blue)
ax.add_patch(vis_box)
plt.text(0.5, 0.69, 'Visualization Service', fontsize=10, ha='center', fontweight='bold')
plt.text(0.5, 0.66, '(Streamlit + Plotly)', fontsize=8, ha='center')

# User Service box
user_box = patches.Rectangle((0.25, 0.45), 0.2, 0.08, fill=True, 
                          linewidth=1, edgecolor='gray', facecolor=nutrifit_light_blue)
ax.add_patch(user_box)
plt.text(0.35, 0.49, 'User Service', fontsize=10, ha='center', fontweight='bold')

# Analytics Service box
analytics_box = patches.Rectangle((0.55, 0.45), 0.2, 0.08, fill=True, 
                               linewidth=1, edgecolor='gray', facecolor=nutrifit_light_blue)
ax.add_patch(analytics_box)
plt.text(0.65, 0.49, 'Nutrition Analytics', fontsize=10, ha='center', fontweight='bold')

# Data Service box
data_box = patches.Rectangle((0.4, 0.25), 0.2, 0.08, fill=True, 
                          linewidth=1, edgecolor='gray', facecolor=nutrifit_light_blue)
ax.add_patch(data_box)
plt.text(0.5, 0.29, 'Data Service', fontsize=10, ha='center', fontweight='bold')

# SQLite Database with improved styling
db_width = 0.12
db_height = 0.06
db_x = 0.82
db_y = 0.35

# Database cylinder shape
ellipse_top = patches.Ellipse((db_x + db_width/2, db_y + db_height), db_width, 
                           db_height/2, fill=True, edgecolor='gray', 
                           facecolor=nutrifit_light_green)
ellipse_bottom = patches.Ellipse((db_x + db_width/2, db_y), db_width, 
                              db_height/2, fill=True, edgecolor='gray', 
                              facecolor=nutrifit_light_green)
rectangle = patches.Rectangle((db_x, db_y), db_width, db_height, 
                           fill=True, edgecolor='gray', facecolor=nutrifit_light_green)

ax.add_patch(rectangle)
ax.add_patch(ellipse_top)
ax.add_patch(ellipse_bottom)
plt.text(db_x + db_width/2, db_y + db_height/2, 'Nutrition\nDatabase', 
       fontsize=8, ha='center', va='center', fontweight='bold')

# Arrows between services with better styling
arrow_style = dict(arrowstyle="->", connectionstyle="arc3,rad=0.2", 
                 color=nutrifit_blue, linewidth=1.5)

# 1. User Service to Visualization
plt.annotate("1. Register/Login/Reset", 
             xy=(0.35, 0.65), xytext=(0.3, 0.55),
             arrowprops=arrow_style, fontsize=8)

# 2. Visualization to Analytics
plt.annotate("2. Request metrics/analytics", 
             xy=(0.65, 0.45), xytext=(0.5, 0.55),
             arrowprops=arrow_style, fontsize=8)

# 3. Analytics to Data
plt.annotate("3. Query nutrition/user data", 
             xy=(0.5, 0.33), xytext=(0.6, 0.42),
             arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=-0.2", 
                           color=nutrifit_blue, linewidth=1.5), fontsize=8)

# 4. Data to DB
plt.annotate("4. Read/Write data", 
             xy=(0.82, 0.35), xytext=(0.6, 0.3),
             arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0.1", 
                           color=nutrifit_blue, linewidth=1.5), fontsize=8)

# 5. DB to Data
plt.annotate("5. Return data", 
             xy=(0.6, 0.33), xytext=(0.75, 0.35),
             arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0.1", 
                           color=nutrifit_blue, linewidth=1.5), fontsize=8)

# 6. Data to Analytics
plt.annotate("6. Raw nutrition data", 
             xy=(0.65, 0.45), xytext=(0.55, 0.35),
             arrowprops=arrow_style, fontsize=8)

# 7. Analytics to Visualization
plt.annotate("7. Processed nutrition analytics", 
             xy=(0.5, 0.65), xytext=(0.7, 0.55),
             arrowprops=arrow_style, fontsize=8)

# 8. Visualization to User Service
plt.annotate("8. Auth/Reset status", 
             xy=(0.35, 0.45), xytext=(0.45, 0.55),
             arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=-0.2", 
                           color=nutrifit_blue, linewidth=1.5), fontsize=8)

# Add a footer
plt.text(0.5, 0.08, 'NutriFit Application - Personalized Nutrition Analysis Platform', 
        fontsize=10, ha='center', color='gray', style='italic')

# Remove axes and set limits
plt.axis('off')
plt.xlim(0, 1)
plt.ylim(0, 1)

# Save the diagram with higher quality
plt.tight_layout()
plt.savefig('nutrifit_sprint2_architecture.png', dpi=300, bbox_inches='tight')
plt.close()

print("NutriFit Sprint 2 Architecture diagram created as 'nutrifit_sprint2_architecture.png'") 