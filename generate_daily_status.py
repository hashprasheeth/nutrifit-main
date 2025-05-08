import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
from matplotlib.font_manager import FontProperties
import numpy as np

# Create the figure
fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# Set NutriFit colors
nutrifit_green = '#4CAF50'
nutrifit_light_green = '#E8F5E9'
nutrifit_dark_green = '#2E7D32'
nutrifit_blue = '#2196F3'

# Create background rectangle for content
content_bg = Rectangle((0.5, 0.5), 9, 9, facecolor=nutrifit_light_green, 
                    edgecolor='lightgray', alpha=0.2, linewidth=1)
ax.add_patch(content_bg)

# Add date
plt.text(5, 9.3, 'March 4, 2025', fontsize=16, fontweight='bold', 
       ha='center', color='#333333')
plt.text(1.8, 8.8, '03 May 2025', fontsize=10, color='gray')
plt.text(8.2, 8.8, '17:30', fontsize=10, color='gray')

# Add horizontal line below date
plt.plot([0.5, 9.5], [8.7, 8.7], color='gray', linewidth=1, alpha=0.5)

# Add what was accomplished section
plt.text(1, 8.3, 'What was accomplished:', fontsize=12, fontweight='bold')
plt.text(1.3, 7.9, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 7.9, 'Sprint 3 documentation finalized', fontsize=11)
plt.text(1.3, 7.5, '•', fontsize=15, color=nutrifit_green, fontweight='bold') 
plt.text(1.7, 7.5, 'Project roadmap updated', fontsize=11)
plt.text(1.3, 7.1, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 7.1, 'Sprint 4 preparation completed', fontsize=11)

# Add today's plan section
plt.text(1, 6.7, 'Today\'s plan:', fontsize=12, fontweight='bold')
plt.text(1.3, 6.3, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 6.3, 'Conduct final sprint 3 review', fontsize=11)
plt.text(1.3, 5.9, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 5.9, 'Update project status', fontsize=11)
plt.text(1.3, 5.5, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 5.5, 'Prepare for sprint 4 kickoff', fontsize=11)

# Add blockers/issues section
plt.text(1, 5.1, 'Blockers/Issues:', fontsize=12, fontweight='bold')
plt.text(1.3, 4.7, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 4.7, 'None', fontsize=11)

# Add sprint review notes section
plt.text(1, 4.3, 'Sprint Review Notes:', fontsize=12, fontweight='bold')
plt.text(1.3, 3.9, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 3.9, 'Successfully implemented nutrition record management features', fontsize=11)
plt.text(1.3, 3.5, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 3.5, 'Data validation and integrity maintained', fontsize=11)
plt.text(1.3, 3.1, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 3.1, 'Audit trail and security measures implemented', fontsize=11)
plt.text(1.3, 2.7, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 2.7, 'Stakeholders approved the nutrition management functionality', fontsize=11)

# Add next sprint focus section
plt.text(1, 2.3, 'Next Sprint Focus:', fontsize=12, fontweight='bold')
plt.text(1.3, 1.9, '•', fontsize=15, color=nutrifit_green, fontweight='bold')
plt.text(1.7, 1.9, 'Authentication and Meal Visualization features', fontsize=11)

# Highlight the kickoff word
kickoff_text = plt.text(6.05, 5.5, 'kickoff', fontsize=11, color=nutrifit_blue)

# Save the figure
plt.tight_layout()
plt.savefig('nutrifit_daily_status.png', dpi=300, bbox_inches='tight')
plt.close()

print("NutriFit daily status image created as 'nutrifit_daily_status.png'") 