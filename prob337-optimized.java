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
        value ans=sol(root);
        return Math.max(ans.include,ans.notinclude);
    }
    public value sol(TreeNode root){
        if(root==null){
            return new value();
        }
        value res=new value();
        value left=sol(root.left);
        value right=sol(root.right);

        res.include=root.val+left.notinclude+right.notinclude;
        res.notinclude=Math.max(left.include,left.notinclude)+Math.max(right.include,right.notinclude);

        return res;
    }
    public class value{
       
            int include=0;
          int  notinclude=0;
        
    }
}