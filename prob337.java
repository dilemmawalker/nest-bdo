/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int rob(TreeNode root) {
        int c=0;
        if(root==null)
        return 0;
        else if(root.left==null && root.right==null)
        return root.val;
        
        int roo=sol(root,0);
        int l=sol(root.left,0);
        int r=sol(root.right,0);

        int lkaleft=0,lkaright=0,rkaleft=0,rkaright=0;
        if(root.left!=null && root.left.left!=null)
        lkaleft=sol(root.left.left,0);
        if(root.left!=null && root.left.right!=null)
        lkaright=sol(root.left.right,0);
        if(root.right!=null && root.right.left!=null)
        rkaleft=sol(root.right.left,0);
        if(root.right!=null && root.right.right!=null)
        rkaright=sol(root.right.right,0);

        int ans=Math.max(roo,l+r);
        ans=Math.max(ans,Math.max(l+rkaleft,l+rkaright));
        ans=Math.max(ans,Math.max(r+lkaleft,r+lkaright));
        return ans;
    }
    int anss=0;
    public int sol(TreeNode root, int c){
        if(root==null){
            anss=Math.max(anss,c);
        return c;
        }
        else if(root.left==null && root.right==null){
            anss=Math.max(anss,c+root.val);
        return c+root.val;
        }
        int res=0,res2=0;

        //left
        if(root.left==null)
        res=c+root.val;
        else{
        res=Math.max(res,sol(root.left.left,c+root.val));
        res=Math.max(res,sol(root.left.right,c+root.val));

        if(root.left.left==null)
        res=Math.max(c+root.val,res);
        else{
        res=Math.max(res,sol(root.left.left.left,c+root.val));
        res=Math.max(res,sol(root.left.left.right,c+root.val));
        }

        if(root.left.right==null)
        res=Math.max(c+root.val,res);
        else{
        res=Math.max(res,sol(root.left.right.left,c+root.val));
        res=Math.max(res,sol(root.left.right.right,c+root.val));
        }
        }

       //right
        if(root.right==null)
        res2=Math.max(c+root.val,res2);
        else{
        res2=Math.max(res2,sol(root.right.left,c+root.val));
        res2=Math.max(res2,sol(root.right.right,c+root.val));

        if(root.right.left==null)
        res2=Math.max(c+root.val,res2);
        else{
        res2=Math.max(res2,sol(root.right.left.left,c+root.val));
        res2=Math.max(res2,sol(root.right.left.right,c+root.val));
        }

        if(root.right.right==null)
        res2=Math.max(c+root.val,res2);
        else{
        res2=Math.max(res2,sol(root.right.right.left,c+root.val));
        res2=Math.max(res2,sol(root.right.right.right,c+root.val));
        }
        }

        return res+res2-root.val;
    }
}